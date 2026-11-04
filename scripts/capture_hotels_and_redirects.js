const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const OUT_DIRS = [
  '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/screenshots',
  '/tmp/test-repo/docs/progress/screenshots'
];

async function main() {
  console.log('Launching Chrome for screenshot capture...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9234',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,1000'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9234/json/version');
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

  // 1. Load /ko/hotels
  console.log('Navigating to http://localhost:3008/ko/hotels ...');
  await sendSession('Page.navigate', { url: 'http://localhost:3008/ko/hotels' });
  await new Promise((r) => setTimeout(r, 3000));

  // Scroll down to newly added card (Merci Hotel)
  await sendSession('Runtime.evaluate', {
    expression: `
      const cards = Array.from(document.querySelectorAll('h3, h2, div, a'));
      for (const el of cards) {
        if (el.textContent && el.textContent.includes('MERCI HOTEL SUNSET TOWN')) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
          break;
        }
      }
    `
  });
  await new Promise((r) => setTimeout(r, 1000));

  let shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  let buf = Buffer.from(shot.data, 'base64');
  for (const d of OUT_DIRS) {
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, '2026-11-03_hotels_sunset_town_42_verified.png'), buf);
  }
  console.log('Saved 2026-11-03_hotels_sunset_town_42_verified.png');

  // 2. Load unregistered redirect test
  console.log('Navigating to unregistered hotel redirect test...');
  await sendSession('Page.navigate', { url: 'http://localhost:3008/ko/business/the-nice-hotel-phu-quoc-fireworks-ocean-view' });
  await new Promise((r) => setTimeout(r, 3000));

  shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  buf = Buffer.from(shot.data, 'base64');
  for (const d of OUT_DIRS) {
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, '2026-11-03_unregistered_redirect_verified.png'), buf);
  }
  console.log('Saved 2026-11-03_unregistered_redirect_verified.png');

  try {
    await send('Target.closeTarget', { targetId });
    ws.close();
  } catch {}
  chromeProcess.kill();
  console.log('All screenshots captured successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
