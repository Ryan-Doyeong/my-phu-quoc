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

  const outDirDev = path.resolve(__dirname, '../docs/progress/2026-10-27/preview_v5');
  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/2026-10-27/preview_v5';
  fs.mkdirSync(outDirDev, { recursive: true });
  fs.mkdirSync(outDirDrive, { recursive: true });

  const tasks = [
    // 1. Home TWO HUBS & Top Nav (ZH / RU / JA / HI)
    { file: '01_home_zh_pc_v5.png', url: 'http://localhost:3000/zh#two-zones', width: 1280, height: 1400 },
    { file: '01b_home_zh_390_v5.png', url: 'http://localhost:3000/zh#two-zones', width: 390, height: 1800, mobile: true },
    { file: '02_home_ru_pc_v5.png', url: 'http://localhost:3000/ru#two-zones', width: 1280, height: 1400 },
    { file: '02b_home_ru_390_v5.png', url: 'http://localhost:3000/ru#two-zones', width: 390, height: 1800, mobile: true },
    { file: '03_home_ja_pc_v5.png', url: 'http://localhost:3000/ja#two-zones', width: 1280, height: 1400 },
    { file: '03b_home_ja_390_v5.png', url: 'http://localhost:3000/ja#two-zones', width: 390, height: 1800, mobile: true },
    { file: '04_home_hi_pc_v5.png', url: 'http://localhost:3000/hi#two-zones', width: 1280, height: 1400 },
    { file: '04b_home_hi_390_v5.png', url: 'http://localhost:3000/hi#two-zones', width: 390, height: 1800, mobile: true },

    // 2. Directory (ZH / RU)
    { file: '05_directory_zh_pc_v5.png', url: 'http://localhost:3000/zh/directory/dining', width: 1280, height: 1400 },
    { file: '05b_directory_zh_390_v5.png', url: 'http://localhost:3000/zh/directory/dining', width: 390, height: 1600, mobile: true },
    { file: '06_directory_ru_pc_v5.png', url: 'http://localhost:3000/ru/directory/dining', width: 1280, height: 1400 },
    { file: '06b_directory_ru_390_v5.png', url: 'http://localhost:3000/ru/directory/dining', width: 390, height: 1600, mobile: true },

    // 3. Transit Guide (EN / KO - Sunset Town & Khem Beach)
    { file: '07_transit_sunset_en_pc_v5.png', url: 'http://localhost:3000/en/zones/sunset-town', width: 1280, height: 900, scrollSelector: 'div[style*="background: #fff8f0"]' },
    { file: '08_transit_sunset_ko_pc_v5.png', url: 'http://localhost:3000/ko/zones/sunset-town', width: 1280, height: 900, scrollSelector: 'div[style*="background: #fff8f0"]' },
    { file: '09_transit_khem_en_pc_v5.png', url: 'http://localhost:3000/en/zones/khem-beach', width: 1280, height: 900, scrollSelector: 'div[style*="background: #fff8f0"]' },
    { file: '10_transit_khem_ko_pc_v5.png', url: 'http://localhost:3000/ko/zones/khem-beach', width: 1280, height: 900, scrollSelector: 'div[style*="background: #fff8f0"]' },

    // 4. Menu Unpriced Item (ZH / RU - Yushima Japanese Restaurant)
    { file: '11_menu_unpriced_zh_pc_v5.png', url: 'http://localhost:3000/zh/business/yushima-japanese-restaurant', width: 1280, height: 1100, scrollSelector: '#menu' },
    { file: '12_menu_unpriced_ru_pc_v5.png', url: 'http://localhost:3000/ru/business/yushima-japanese-restaurant', width: 1280, height: 1100, scrollSelector: '#menu' },

    // 5. Symphony Season 3 News (KO / EN)
    { file: '13_article_symphony_ko_pc_v5.png', url: 'http://localhost:3000/ko/news/symphony-of-the-sea-season-3-opening', width: 1280, height: 1400 },
    { file: '14_article_symphony_en_pc_v5.png', url: 'http://localhost:3000/en/news/symphony-of-the-sea-season-3-opening', width: 1280, height: 1400 },
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
      await new Promise((r) => setTimeout(r, 600));
    }

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(path.join(outDirDev, t.file), buffer);
    fs.writeFileSync(path.join(outDirDrive, t.file), buffer);
  }

  console.log('\n✓ Successfully captured all v5 screenshots into preview_v5!');
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
