const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9224',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9224/json/version');
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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-29/preview_v18');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-29/preview_v18';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    { file: '01_member_zh.png', url: 'http://localhost:3008/zh/member', width: 1440, height: 900 },
    { file: '02_member_hi.png', url: 'http://localhost:3008/hi/member', width: 1440, height: 900 },
    { file: '03_hotels_directory_zh.png', url: 'http://localhost:3008/zh/directory/hotels', width: 1440, height: 1000 },
    { file: '04_dining_business_hi.png', url: 'http://localhost:3008/hi/business/draft-beer-sunset-town-phu-quoc', width: 1440, height: 1100, scrollTo: '#food-guide' },
    { file: '05_news_detail_ja.png', url: 'http://localhost:3008/ja/news/hon-thom-cable-car-day-trip', width: 1440, height: 1000 },
    { file: '06_zones_khem_ru.png', url: 'http://localhost:3008/ru/zones/khem-beach', width: 1440, height: 900 },
  ];

  for (const t of tasks) {
    console.log(`Capturing: ${t.file} (${t.width}x${t.height}) from ${t.url}`);
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: false,
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
      await new Promise((r) => setTimeout(r, 600));
    }

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(outDirDev, t.file), buffer);
    fs.writeFileSync(path.join(outDirDrive, t.file), buffer);
  }

  console.log('\n✓ Successfully captured all preview_v18 screenshots!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
