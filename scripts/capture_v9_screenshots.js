const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9258',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9258/json/version');
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
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  async function capture(url, outPath, waitMs = 1500, evalFn = null) {
    console.log(`Navigating to: ${url}`);
    await sendSession('Page.navigate', { url });
    await new Promise((r) => setTimeout(r, waitMs));
    if (evalFn) {
      await sendSession('Runtime.evaluate', { expression: `(${evalFn.toString()})()` });
      await new Promise((r) => setTimeout(r, 600));
    }
    const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    console.log(`Saved screenshot: ${outPath}`);
  }

  const artifactDir = '/Users/admin/.gemini/antigravity/brain/c656b9d7-a742-4e8c-803c-b1085768ce80';
  const driveDir = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc';
  const baseUrl = 'http://localhost:3012';

  const targets = [
    // 1. Roma Hotel (Standard hotel in Sunset Town)
    {
      url: `${baseUrl}/ko/hotels?area=sunset-town`,
      name: 'v9_standard_roma_hotel_modal_mobile.png',
      evalFn: () => {
        const titles = Array.from(document.querySelectorAll('.cardTitle'));
        const el = titles.find(t => t.textContent.includes('로마 호텔'));
        if (el) el.closest('.hotelCard').querySelector('.cardBtnDetail').click();
        const modal = document.querySelector('.hotelDetailModal');
        if (modal) modal.scrollTop = 220;
      }
    },
    // 2. Casepia Hotel (Standard hotel in Sunset Town)
    {
      url: `${baseUrl}/ko/hotels?area=sunset-town`,
      name: 'v9_standard_casepia_modal_mobile.png',
      evalFn: () => {
        const titles = Array.from(document.querySelectorAll('.cardTitle'));
        const el = titles.find(t => t.textContent.includes('카세피아'));
        if (el) el.closest('.hotelCard').querySelector('.cardBtnDetail').click();
        const modal = document.querySelector('.hotelDetailModal');
        if (modal) modal.scrollTop = 220;
      }
    },
    // 3. Catarina Hotel (Standard hotel in Sunset Town)
    {
      url: `${baseUrl}/ko/hotels?area=sunset-town`,
      name: 'v9_standard_catarina_modal_mobile.png',
      evalFn: () => {
        const titles = Array.from(document.querySelectorAll('.cardTitle'));
        const el = titles.find(t => t.textContent.includes('카타리나'));
        if (el) el.closest('.hotelCard').querySelector('.cardBtnDetail').click();
        const modal = document.querySelector('.hotelDetailModal');
        if (modal) modal.scrollTop = 220;
      }
    },
    // 4. JW Marriott (Khem Beach resort)
    {
      url: `${baseUrl}/ko/hotels?area=khem-beach`,
      name: 'v9_khem_jw_marriott_modal_mobile.png',
      evalFn: () => {
        const titles = Array.from(document.querySelectorAll('.cardTitle'));
        const el = titles.find(t => t.textContent.includes('JW 메리어트'));
        if (el) el.closest('.hotelCard').querySelector('.cardBtnDetail').click();
        const modal = document.querySelector('.hotelDetailModal');
        if (modal) modal.scrollTop = 220;
      }
    },
    // 5. Premier Village (Khem Beach resort - 18~20 min drive badge)
    {
      url: `${baseUrl}/ko/hotels?area=khem-beach`,
      name: 'v9_khem_premier_village_modal_mobile.png',
      evalFn: () => {
        const titles = Array.from(document.querySelectorAll('.cardTitle'));
        const el = titles.find(t => t.textContent.includes('프리미어 빌리지'));
        if (el) el.closest('.hotelCard').querySelector('.cardBtnDetail').click();
        const modal = document.querySelector('.hotelDetailModal');
        if (modal) modal.scrollTop = 220;
      }
    }
  ];

  for (const t of targets) {
    const artPath = path.join(artifactDir, t.name);
    const drivePath = path.join(driveDir, t.name);
    await capture(t.url, artPath, 2000, t.evalFn);
    fs.copyFileSync(artPath, drivePath);
    console.log(`Copied to Drive: ${drivePath}`);
  }

  console.log('All v9 screenshots captured and saved successfully!');
  ws.close();
  chromeProcess.kill();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
