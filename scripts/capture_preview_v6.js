const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9229',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9229/json/version');
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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-27/preview_v6');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-27/preview_v6';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    // 1. With Menu (Yushima Japanese Restaurant) - ZH, RU, JA, HI
    { file: '01_biz_menu_zh_pc_v6.png', url: 'http://localhost:3000/zh/business/yushima-japanese-restaurant', width: 1280, height: 1600 },
    { file: '01b_biz_menu_zh_390_v6.png', url: 'http://localhost:3000/zh/business/yushima-japanese-restaurant', width: 390, height: 2200, mobile: true },

    { file: '02_biz_menu_ru_pc_v6.png', url: 'http://localhost:3000/ru/business/yushima-japanese-restaurant', width: 1280, height: 1600 },
    { file: '02b_biz_menu_ru_390_v6.png', url: 'http://localhost:3000/ru/business/yushima-japanese-restaurant', width: 390, height: 2200, mobile: true },

    { file: '03_biz_menu_ja_pc_v6.png', url: 'http://localhost:3000/ja/business/yushima-japanese-restaurant', width: 1280, height: 1600 },
    { file: '03b_biz_menu_ja_390_v6.png', url: 'http://localhost:3000/ja/business/yushima-japanese-restaurant', width: 390, height: 2200, mobile: true },

    { file: '04_biz_menu_hi_pc_v6.png', url: 'http://localhost:3000/hi/business/yushima-japanese-restaurant', width: 1280, height: 1600 },
    { file: '04b_biz_menu_hi_390_v6.png', url: 'http://localhost:3000/hi/business/yushima-japanese-restaurant', width: 390, height: 2200, mobile: true },

    // 2. Without Menu (Noska Hotel) - ZH, RU, JA, HI
    { file: '05_biz_nomenu_zh_pc_v6.png', url: 'http://localhost:3000/zh/business/noska-hotel', width: 1280, height: 1600 },
    { file: '05b_biz_nomenu_zh_390_v6.png', url: 'http://localhost:3000/zh/business/noska-hotel', width: 390, height: 2200, mobile: true },

    { file: '06_biz_nomenu_ru_pc_v6.png', url: 'http://localhost:3000/ru/business/noska-hotel', width: 1280, height: 1600 },
    { file: '06b_biz_nomenu_ru_390_v6.png', url: 'http://localhost:3000/ru/business/noska-hotel', width: 390, height: 2200, mobile: true },

    { file: '07_biz_nomenu_ja_pc_v6.png', url: 'http://localhost:3000/ja/business/noska-hotel', width: 1280, height: 1600 },
    { file: '07b_biz_nomenu_ja_390_v6.png', url: 'http://localhost:3000/ja/business/noska-hotel', width: 390, height: 2200, mobile: true },

    { file: '08_biz_nomenu_hi_pc_v6.png', url: 'http://localhost:3000/hi/business/noska-hotel', width: 1280, height: 1600 },
    { file: '08b_biz_nomenu_hi_390_v6.png', url: 'http://localhost:3000/hi/business/noska-hotel', width: 390, height: 2200, mobile: true },
  ];

  for (const t of tasks) {
    console.log(`Capturing: ${t.file} (${t.width}x${t.height}px) from ${t.url}`);
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: !!t.mobile,
    });

    await sendSession('Page.navigate', { url: t.url });
    await new Promise((r) => setTimeout(r, 2200));

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(outDirDev, t.file), buffer);
    fs.writeFileSync(path.join(outDirDrive, t.file), buffer);
  }

  console.log('\n✓ Successfully captured all 16 preview_v6 screenshots!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
