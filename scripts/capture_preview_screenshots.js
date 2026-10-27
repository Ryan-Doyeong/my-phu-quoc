const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9223',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9223/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  if (!wsUrl) {
    chromeProcess.kill();
    throw new Error('Failed to connect to headless Chrome');
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

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-27/preview');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-27/preview';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    // 1. Home Two Zones
    { file: '01_home_two_zones_pc.png', url: 'http://localhost:3000/ko', width: 1280, height: 1100, scrollTo: '#two-zones' },
    { file: '02_home_two_zones_mobile_390.png', url: 'http://localhost:3000/ko', width: 390, height: 1300, scrollTo: '#two-zones', mobile: true },
    { file: '02b_home_two_zones_mobile_360.png', url: 'http://localhost:3000/ko', width: 360, height: 1300, scrollTo: '#two-zones', mobile: true },

    // 2. Sunset Town Zone Page
    { file: '03_sunset_town_zone_pc.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 1280, height: 1200 },
    { file: '03b_sunset_town_zone_mobile_390.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 390, height: 1500, mobile: true },
    { file: '03c_sunset_town_zone_mobile_360.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 360, height: 1500, mobile: true },

    // 3. Khem Beach Zone Page
    { file: '04_khem_beach_zone_pc.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 1280, height: 1200 },
    { file: '04b_khem_beach_zone_mobile_390.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 390, height: 1500, mobile: true },
    { file: '04c_khem_beach_zone_mobile_360.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 360, height: 1500, mobile: true },

    // 4. 10 Category Pages (PC)
    { file: '05_cat_dining_pc.png', url: 'http://localhost:3000/ko/directory/dining', width: 1280, height: 1000 },
    { file: '06_cat_bars_pc.png', url: 'http://localhost:3000/ko/directory/bars', width: 1280, height: 1000 },
    { file: '07_cat_hotels_pc.png', url: 'http://localhost:3000/ko/directory/hotels', width: 1280, height: 1000 },
    { file: '08_cat_shopping_pc.png', url: 'http://localhost:3000/ko/directory/shopping', width: 1280, height: 1000 },
    { file: '09_cat_wellness_pc.png', url: 'http://localhost:3000/ko/directory/wellness', width: 1280, height: 1000 },
    { file: '10_cat_activities_pc.png', url: 'http://localhost:3000/ko/directory/activities', width: 1280, height: 1000 },
    { file: '11_cat_beaches_pc.png', url: 'http://localhost:3000/ko/directory/beaches', width: 1280, height: 1000 },
    { file: '12_cat_banking_pc.png', url: 'http://localhost:3000/ko/directory/banking', width: 1280, height: 1000 },
    { file: '13_cat_essentials_pc.png', url: 'http://localhost:3000/ko/directory/essentials', width: 1280, height: 1000 },
    { file: '14_cat_transport_pc.png', url: 'http://localhost:3000/ko/directory/transport', width: 1280, height: 1000 },
  ];

  for (const t of tasks) {
    console.log(`Capturing: ${t.file} (${t.width}px) from ${t.url}`);
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: !!t.mobile,
    });

    await sendSession('Page.navigate', { url: t.url });
    await new Promise((r) => setTimeout(r, 2000));

    if (t.scrollTo) {
      await sendSession('Runtime.evaluate', {
        expression: `
          const el = document.querySelector('${t.scrollTo}');
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        `,
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(outDirDev, t.file), buffer);
    fs.writeFileSync(path.join(outDirDrive, t.file), buffer);
  }

  console.log('\n✓ Successfully captured all screenshots!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
