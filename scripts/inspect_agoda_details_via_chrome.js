const fs = require('fs');
const { spawn } = require('child_process');

const HOTELS_TO_INSPECT = [
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

async function main() {
  console.log('Launching Chrome for Agoda inspection...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9232/json/version');
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

  const results = [];

  for (const h of HOTELS_TO_INSPECT) {
    console.log(`\nNavigating to: ${h.name} -> ${h.url}`);
    await sendSession('Page.navigate', { url: h.url });
    await new Promise((r) => setTimeout(r, 6000));

    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const finalUrl = window.location.href;
          const docTitle = document.title;
          const h1 = document.querySelector('h1')?.innerText?.trim() || '';
          
          // Address
          const addressEl = document.querySelector('[data-selenium="hotel-address-map"], [data-element-name="property-address"], .HeaderCerebrum__Address');
          const address = addressEl?.innerText?.trim() || '';
          
          // Rating Score
          const scoreEl = document.querySelector('[data-selenium="review-score-value"], [data-selenium="hotel-header-rating"] h3, .ReviewScore-Number');
          const score = scoreEl?.innerText?.trim() || '';
          
          // Review Count
          const reviewCountEl = document.querySelector('[data-selenium="hotel-header-rating"] p, [data-selenium="review-count"], .ReviewScore-Count');
          const reviews = reviewCountEl?.innerText?.trim() || '';
          
          // Stars
          const starEl = document.querySelector('[data-selenium="hotel-header-rating"] [class*="star"], [data-element-name="property-rating"]');
          const starTitle = starEl?.getAttribute('title') || starEl?.getAttribute('aria-label') || '';
          
          // Photos
          const imgs = Array.from(document.querySelectorAll('img[src*="agoda"], img[src*="hotel"], [data-selenium*="photo"] img'))
            .map(i => i.src)
            .filter(s => s && s.startsWith('http') && !s.includes('logo') && !s.includes('icon'));

          return {
            finalUrl,
            docTitle,
            h1,
            address,
            score,
            reviews,
            starTitle,
            photoSample: imgs.slice(0, 3)
          };
        })()
      `,
      returnByValue: true
    });

    const val = evalRes.result.value;
    console.log('Result:', JSON.stringify(val, null, 2));
    results.push({ ...h, ...val });
  }

  try {
    await send('Target.closeTarget', { targetId });
    ws.close();
  } catch {}
  chromeProcess.kill();

  fs.writeFileSync('/tmp/agoda_chrome_inspection_results.json', JSON.stringify(results, null, 2));
  console.log('\nInspection saved to /tmp/agoda_chrome_inspection_results.json');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
