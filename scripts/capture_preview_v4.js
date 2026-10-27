const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9226',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9226/json/version');
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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-27/preview_v4');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-27/preview_v4';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    // KO
    { file: '01_sunset_town_ko_pc_v4.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 1280, height: 1300 },
    { file: '01b_sunset_town_ko_390_v4.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '02_khem_beach_ko_pc_v4.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 1280, height: 1300 },
    { file: '02b_khem_beach_ko_390_v4.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 390, height: 1600, mobile: true },

    // EN
    { file: '03_sunset_town_en_pc_v4.png', url: 'http://localhost:3000/en/zones/sunset-town', width: 1280, height: 1300 },
    { file: '03b_sunset_town_en_390_v4.png', url: 'http://localhost:3000/en/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '04_khem_beach_en_pc_v4.png', url: 'http://localhost:3000/en/zones/khem-beach', width: 1280, height: 1300 },
    { file: '04b_khem_beach_en_390_v4.png', url: 'http://localhost:3000/en/zones/khem-beach', width: 390, height: 1600, mobile: true },

    // ZH (中文)
    { file: '05_sunset_town_zh_pc_v4.png', url: 'http://localhost:3000/zh/zones/sunset-town', width: 1280, height: 1300 },
    { file: '05b_sunset_town_zh_390_v4.png', url: 'http://localhost:3000/zh/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '06_khem_beach_zh_pc_v4.png', url: 'http://localhost:3000/zh/zones/khem-beach', width: 1280, height: 1300 },
    { file: '06b_khem_beach_zh_390_v4.png', url: 'http://localhost:3000/zh/zones/khem-beach', width: 390, height: 1600, mobile: true },

    // RU (Русский)
    { file: '07_sunset_town_ru_pc_v4.png', url: 'http://localhost:3000/ru/zones/sunset-town', width: 1280, height: 1300 },
    { file: '07b_sunset_town_ru_390_v4.png', url: 'http://localhost:3000/ru/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '08_khem_beach_ru_pc_v4.png', url: 'http://localhost:3000/ru/zones/khem-beach', width: 1280, height: 1300 },
    { file: '08b_khem_beach_ru_390_v4.png', url: 'http://localhost:3000/ru/zones/khem-beach', width: 390, height: 1600, mobile: true },

    // JA (日本語)
    { file: '09_sunset_town_ja_pc_v4.png', url: 'http://localhost:3000/ja/zones/sunset-town', width: 1280, height: 1300 },
    { file: '09b_sunset_town_ja_390_v4.png', url: 'http://localhost:3000/ja/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '10_khem_beach_ja_pc_v4.png', url: 'http://localhost:3000/ja/zones/khem-beach', width: 1280, height: 1300 },
    { file: '10b_khem_beach_ja_390_v4.png', url: 'http://localhost:3000/ja/zones/khem-beach', width: 390, height: 1600, mobile: true },

    // HI (हिन्दी)
    { file: '11_sunset_town_hi_pc_v4.png', url: 'http://localhost:3000/hi/zones/sunset-town', width: 1280, height: 1300 },
    { file: '11b_sunset_town_hi_390_v4.png', url: 'http://localhost:3000/hi/zones/sunset-town', width: 390, height: 1600, mobile: true },
    { file: '12_khem_beach_hi_pc_v4.png', url: 'http://localhost:3000/hi/zones/khem-beach', width: 1280, height: 1300 },
    { file: '12b_khem_beach_hi_390_v4.png', url: 'http://localhost:3000/hi/zones/khem-beach', width: 390, height: 1600, mobile: true },
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

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(outDirDev, t.file), buffer);
    fs.writeFileSync(path.join(outDirDrive, t.file), buffer);
  }

  console.log('\n✓ Successfully captured all v4 screenshots into preview_v4!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
