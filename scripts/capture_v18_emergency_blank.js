const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const V18_DIR = '/Users/admin/내 드라이브(namdo772@gmail.com)/마이푸꾸옥/메인개편_시안/v18_긴급상황조사';
fs.mkdirSync(V18_DIR, { recursive: true });

const LOCAL_PORT = 3009;
const TARGET_URL = `http://localhost:${LOCAL_PORT}/ko/emergency`;

async function main() {
  console.log('Starting headless Chrome on port 9295...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9295',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9295/json/version');
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
  await sendSession('Runtime.enable');

  async function navigate(url, width, height, isMobile) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
    });
    await sendSession('Page.navigate', { url });
    await new Promise((r) => setTimeout(r, 1500));
  }

  async function captureFullPage(filepath) {
    const { data } = await sendSession('Page.captureScreenshot', { captureBeyondViewport: true });
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved screenshot: ${filepath}`);
  }

  // 1. Desktop 1440px
  console.log('\nCapturing Desktop 1440px...');
  await navigate(TARGET_URL, 1440, 900, false);
  const desktopPath = path.join(V18_DIR, '긴급상황_빈틀_데스크톱_1440.png');
  await captureFullPage(desktopPath);

  // 2. Mobile 390px
  console.log('\nCapturing Mobile 390px...');
  await navigate(TARGET_URL, 390, 844, true);
  const mobilePath = path.join(V18_DIR, '긴급상황_빈틀_모바일_390.png');
  await captureFullPage(mobilePath);

  ws.close();
  chromeProcess.kill();
  console.log('\nAll captures in v18_긴급상황조사 saved successfully!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
