const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9227',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9227/json/version');
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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-28/preview_v7');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-28/preview_v7';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    // 1. ZH (Chinese)
    { file: '01_transit_home_zh_pc_v7.png', url: 'http://localhost:3000/zh#two-zones', width: 1280, height: 900, scrollSelector: '.interZoneBridge' },
    { file: '01b_transit_home_zh_390_v7.png', url: 'http://localhost:3000/zh#two-zones', width: 390, height: 844, mobile: true, scrollSelector: '.interZoneBridge' },

    // 2. EN (English)
    { file: '02_transit_home_en_pc_v7.png', url: 'http://localhost:3000/en#two-zones', width: 1280, height: 900, scrollSelector: '.interZoneBridge' },
    { file: '02b_transit_home_en_390_v7.png', url: 'http://localhost:3000/en#two-zones', width: 390, height: 844, mobile: true, scrollSelector: '.interZoneBridge' },

    // 3. HI (Hindi)
    { file: '03_transit_home_hi_pc_v7.png', url: 'http://localhost:3000/hi#two-zones', width: 1280, height: 900, scrollSelector: '.interZoneBridge' },
    { file: '03b_transit_home_hi_390_v7.png', url: 'http://localhost:3000/hi#two-zones', width: 390, height: 844, mobile: true, scrollSelector: '.interZoneBridge' },

    // 4. RU (Russian)
    { file: '04_transit_home_ru_pc_v7.png', url: 'http://localhost:3000/ru#two-zones', width: 1280, height: 900, scrollSelector: '.interZoneBridge' },
    { file: '04b_transit_home_ru_390_v7.png', url: 'http://localhost:3000/ru#two-zones', width: 390, height: 844, mobile: true, scrollSelector: '.interZoneBridge' },
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
    await new Promise((r) => setTimeout(r, 2200));

    if (t.scrollSelector) {
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('${t.scrollSelector}');
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'center' });
          }
        })()`,
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

  console.log('\n✓ Successfully captured all v7 transit bridge screenshots into preview_v7!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
