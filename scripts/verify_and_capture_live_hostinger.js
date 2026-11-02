const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const OUT_DIRS = [
  '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/screenshots',
  '/tmp/test-repo/docs/progress/screenshots'
];

async function pollDeployment() {
  const testUrl = 'https://myphuquoc.net/images/hotels/the-room-hotel/the-room-hotel-oceanview-room.jpg';
  console.log(`Polling Hostinger production deployment at ${testUrl}...`);
  const maxAttempts = 40; // 40 * 10s = 400s (6.6 mins)
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(`${testUrl}?v=${Date.now()}`, { method: 'HEAD' });
      console.log(`[Attempt ${attempt}/${maxAttempts}] HTTP status: ${res.status}`);
      if (res.status === 200) {
        console.log('Hostinger deployment is live with the new image!');
        return true;
      }
    } catch (err) {
      console.log(`[Attempt ${attempt}/${maxAttempts}] Fetch error: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 10000));
  }
  throw new Error('Hostinger deployment timed out.');
}

async function verifyHtml() {
  const v = Date.now();
  console.log('Verifying Sunset Town Hotels HTML...');
  const resSunset = await fetch(`https://myphuquoc.net/ko/hotels?v=${v}`);
  const htmlSunset = await resSunset.text();

  const hasRoomPhoto = htmlSunset.includes('the-room-hotel-oceanview-room.jpg');
  console.log(`HTML contains the-room-hotel-oceanview-room.jpg: ${hasRoomPhoto}`);
  if (!hasRoomPhoto) {
    throw new Error('HTML does not contain the-room-hotel-oceanview-room.jpg');
  }

  const hasNiceHotel = htmlSunset.includes('더 나이스 호텔') || htmlSunset.includes('The Nice Hotel');
  console.log(`HTML contains The Nice Hotel (should be false): ${hasNiceHotel}`);
  if (hasNiceHotel) {
    throw new Error('HTML still contains The Nice Hotel');
  }

  console.log('Verifying Khem Beach Hotels HTML...');
  const resKhem = await fetch(`https://myphuquoc.net/ko/hotels?area=khem-beach&v=${v}`);
  const htmlKhem = await resKhem.text();

  const expectedAgoda = 'https://www.agoda.com/ko-kr/premier-village-phu-quoc-resort-managed-by-accorhotels/hotel/phu-quoc-island-vn.html';
  const hasAgoda = htmlKhem.includes(expectedAgoda);
  console.log(`HTML contains updated Premier Village Agoda direct URL: ${hasAgoda}`);
  if (!hasAgoda) {
    throw new Error('HTML does not contain updated Premier Village Agoda direct URL');
  }
}

async function captureScreenshots() {
  for (const dir of OUT_DIRS) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Starting headless Chrome...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
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
  await sendSession('Network.enable');

  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 2,
    mobile: false
  });

  // Capture 1: The Room Hotel on Sunset Town Hotels page
  console.log('Navigating to live /ko/hotels...');
  const v = Date.now();
  await sendSession('Page.navigate', { url: `https://myphuquoc.net/ko/hotels?v=${v}` });
  await new Promise((r) => setTimeout(r, 4000));

  await sendSession('Runtime.evaluate', {
    expression: `
      const cards = Array.from(document.querySelectorAll('div, article, a, section'));
      for (const el of cards) {
        if (el.textContent && el.textContent.includes('더 룸 호텔') && el.textContent.includes('호텔 둘러보기')) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
          break;
        }
      }
    `
  });
  await new Promise((r) => setTimeout(r, 3000));

  const shot1 = await sendSession('Page.captureScreenshot', { format: 'png' });
  const buf1 = Buffer.from(shot1.data, 'base64');
  for (const dir of OUT_DIRS) {
    fs.writeFileSync(path.join(dir, '2026-11-02_production_the_room_hotel_room_photo_verified.png'), buf1);
  }
  console.log('Saved 2026-11-02_production_the_room_hotel_room_photo_verified.png');

  // Capture 2: Premier Village on Khem Beach Hotels page
  console.log('Navigating to live /ko/hotels?area=khem-beach...');
  await sendSession('Page.navigate', { url: `https://myphuquoc.net/ko/hotels?area=khem-beach&v=${v}` });
  await new Promise((r) => setTimeout(r, 4000));

  await sendSession('Runtime.evaluate', {
    expression: `
      const cards = Array.from(document.querySelectorAll('div, article, a, section'));
      for (const el of cards) {
        if (el.textContent && el.textContent.includes('프리미어 빌리지') && el.textContent.includes('아고다')) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
          break;
        }
      }
    `
  });
  await new Promise((r) => setTimeout(r, 3000));

  const shot2 = await sendSession('Page.captureScreenshot', { format: 'png' });
  const buf2 = Buffer.from(shot2.data, 'base64');
  for (const dir of OUT_DIRS) {
    fs.writeFileSync(path.join(dir, '2026-11-02_production_premier_village_agoda_verified.png'), buf2);
  }
  console.log('Saved 2026-11-02_production_premier_village_agoda_verified.png');

  try {
    await send('Target.closeTarget', { targetId });
    ws.close();
  } catch {}
  chromeProcess.kill();
  console.log('Screenshots captured and saved successfully.');
}

async function run() {
  await pollDeployment();
  await verifyHtml();
  await captureScreenshots();
  console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
