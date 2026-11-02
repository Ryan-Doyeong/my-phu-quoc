const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3007;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIRS = [
  '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/screenshots',
  '/tmp/test-repo/docs/progress/screenshots'
];

async function main() {
  for (const dir of OUT_DIRS) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Starting headless Chrome...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9228/json/version');
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

  const targets = [
    {
      urlPath: '/ko/hotels',
      filename: '2026-11-02_hotels_sunset_town_desktop.png',
      width: 1440,
      height: 1200,
    },
    {
      urlPath: '/ko/hotels?area=khem-beach',
      filename: '2026-11-02_hotels_khem_beach_desktop.png',
      width: 1440,
      height: 1200,
    },
    {
      urlPath: '/ko/directory/dining',
      filename: '2026-11-02_directory_dining_casepia.png',
      width: 1440,
      height: 1200,
    },
    {
      urlPath: '/ko/business/the-room-hotel',
      filename: '2026-11-02_business_the_room_hotel.png',
      width: 1440,
      height: 1200,
    },
  ];

  for (const t of targets) {
    console.log(`Navigating to ${BASE_URL}${t.urlPath}...`);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 1.5,
      mobile: false,
    });

    await sendSession('Page.navigate', { url: `${BASE_URL}${t.urlPath}` });
    await new Promise((r) => setTimeout(r, 2500));

    const { data: bufferBase64 } = await sendSession('Page.captureScreenshot', {
      format: 'png',
      quality: 90,
      clip: { x: 0, y: 0, width: t.width, height: t.height, scale: 1 },
    });

    const buf = Buffer.from(bufferBase64, 'base64');
    for (const dir of OUT_DIRS) {
      const outPath = path.join(dir, t.filename);
      fs.writeFileSync(outPath, buf);
      console.log(`Saved screenshot to ${outPath}`);
    }
  }

  await send('Target.closeTarget', { targetId });
  ws.close();
  chromeProcess.kill();
  console.log('All screenshots captured successfully!');
}

main().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
