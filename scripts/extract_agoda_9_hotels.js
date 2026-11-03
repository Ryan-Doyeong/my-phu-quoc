const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');

const HOTELS_TO_FETCH = [
  {
    slug: 'merci-hotel-sunset-town-phu-quoc',
    name: 'MERCI HOTEL SUNSET TOWN PHU QUOC',
    url: 'https://www.agoda.com/ko-kr/chu-i-can-h-merci-hotel-sunset-town-phu-quoc/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'blue-hotel-sunset-town-phu-quoc',
    name: 'Blue Hotel Sunset Town Phu Quoc',
    url: 'https://www.agoda.com/ko-kr/blue-hotel-spa-phu-quoc/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'the-fern-phu-quoc-hotel-sunset-town',
    name: 'The Fern Phu Quoc Hotel Sunset Town',
    url: 'https://www.agoda.com/ko-kr/the-fern-hotel-phu-quoc/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'dido-carthage-apartment-sunset-town-phu-quoc-island',
    name: 'Dido Carthage Apartment Sunset Town',
    url: 'https://www.agoda.com/ko-kr/dido-carthage-aparment-sunset-town/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'crystal-apartment-hillside-phu-quoc-sunset-town-firework',
    name: 'Crystal Apartment Hillside Phu Quoc',
    url: 'https://www.agoda.com/ko-kr/crystal-apartment-hillside-phu-quoc/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'rosie-hillside-phu-quoc-apartment',
    name: 'Rosie Hillside Phu Quoc apartment',
    url: 'https://www.agoda.com/ko-kr/rosie-amie-hillside-luxury-phu-quoc-apartment/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'sunset-home-apartment-phu-quoc',
    name: 'Sunset Home - Apartment Phu Quoc',
    url: 'https://www.agoda.com/ko-kr/sunset-home-with-sea-view-phu-qu-c/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'the-juliet-a-boutique-hotel-coffee-ama-71',
    name: 'The Juliet A Boutique Hotel & Coffee - Ama 71',
    url: 'https://www.agoda.com/ko-kr/juliet-s-boutique-hotel-h40212970/hotel/phu-quoc-island-vn.html'
  },
  {
    slug: 'eirlys-home-apartment-phu-quoc-firework-ocean-view',
    name: 'Eirlys Home Apartment Phu Quoc',
    url: 'https://www.agoda.com/ko-kr/eirlys-home-h48118274/hotel/phu-quoc-island-vn.html'
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function main() {
  console.log('Starting Agoda data extraction and image downloader...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9245',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9245/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  if (!wsUrl) {
    chromeProcess.kill();
    throw new Error('Could not connect to Chrome');
  }

  const ws = new WebSocket(wsUrl);
  let idCounter = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('DOM.enable');

  const hotelDetails = [];

  for (const h of HOTELS_TO_FETCH) {
    console.log(`\nInspecting Agoda: ${h.name} -> ${h.url}`);
    await sendSession('Page.navigate', { url: h.url });
    await new Promise((r) => setTimeout(r, 5000));

    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const bodyText = document.body.innerText;

          // 1. Rating
          let score = null;
          const scoreMatches = bodyText.match(/(\\d+\\.\\d+|10)\\s*\\n*(최고|우수|매우 좋음|좋음|보통|만족)/);
          if (scoreMatches) {
            score = parseFloat(scoreMatches[1]);
          }

          // 2. Review count
          let reviewsCount = null;
          const revMatches = bodyText.match(/(\\d[\\d,]*)\\s*건의 이용\\s*후기/);
          if (revMatches) {
            reviewsCount = parseInt(revMatches[1].replace(/,/g, ''), 10);
          } else {
            const revAlt = bodyText.match(/이용후기\\s*(\\d[\\d,]*)\\s*건/);
            if (revAlt) reviewsCount = parseInt(revAlt[1].replace(/,/g, ''), 10);
          }

          // 3. Distance to cable car
          let cable_m = null;
          const cableMatch = bodyText.match(/Hon Thom Cable Car[^(]*\\((\\d+)(m|km)/i);
          if (cableMatch) {
            if (cableMatch[2] === 'km') cable_m = Math.round(parseFloat(cableMatch[1]) * 1000);
            else cable_m = parseInt(cableMatch[1], 10);
          } else {
            const cableAlt = bodyText.match(/혼똠 케이블카[^(]*\\((\\d+)m\\)/i);
            if (cableAlt) cable_m = parseInt(cableAlt[1], 10);
          }

          // 4. Star rating
          let star = null;
          const starMatch = bodyText.match(/(\\d)성급/);
          if (starMatch) star = parseInt(starMatch[1], 10);

          // 5. Sub ratings
          const subClean = bodyText.match(/숙소 청결 상태\\s*\\n*(\\d+\\.\\d+)/);
          const subServ = bodyText.match(/서비스\\s*\\n*(\\d+\\.\\d+)/);
          const subLoc = bodyText.match(/위치\\s*\\n*(\\d+\\.\\d+)/);
          const subFac = bodyText.match(/부대시설\\s*\\n*(\\d+\\.\\d+)/);
          const subVal = bodyText.match(/가격 대비 만족도\\s*\\n*(\\d+\\.\\d+)/);

          // 6. Photo URLs
          const imgs = Array.from(document.querySelectorAll('img'))
            .map(img => img.src)
            .filter(src => src && (src.includes('pix8.agoda.net/hotelImages') || src.includes('bstatic.com/xdata/images/hotel')))
            .slice(0, 6);

          return {
            score,
            reviewsCount,
            cable_m,
            star,
            subRatings: {
              cleanliness: subClean ? parseFloat(subClean[1]) : null,
              service: subServ ? parseFloat(subServ[1]) : null,
              location: subLoc ? parseFloat(subLoc[1]) : null,
              facilities: subFac ? parseFloat(subFac[1]) : null,
              value: subVal ? parseFloat(subVal[1]) : null,
            },
            photos: Array.from(new Set(imgs))
          };
        })()
      `,
      returnByValue: true
    });

    const val = evalRes.result?.value || {};
    console.log(`Results for ${h.slug}:`, JSON.stringify(val, null, 2));
    hotelDetails.push({
      slug: h.slug,
      name: h.name,
      ...val
    });
  }

  try {
    await send('Target.closeTarget', { targetId });
    ws.close();
  } catch {}
  chromeProcess.kill();

  fs.writeFileSync('/tmp/extracted_agoda_9_hotels.json', JSON.stringify(hotelDetails, null, 2));
  console.log('Saved inspection to /tmp/extracted_agoda_9_hotels.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
