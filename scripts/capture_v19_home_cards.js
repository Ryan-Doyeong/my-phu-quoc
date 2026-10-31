const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const V19_DIR = '/Users/admin/내 드라이브(namdo772@gmail.com)/마이푸꾸옥/메인개편_시안/v19_홈카드확장';
fs.mkdirSync(V19_DIR, { recursive: true });

const LOCAL_PORT = 3009;
const BASE_URL = `http://localhost:${LOCAL_PORT}`;

async function main() {
  console.log('Starting headless Chrome on port 9292...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9292',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9292/json/version');
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

  async function captureElement(selector, filepath, pad = 10) {
    const expr = `
      (() => {
        const el = document.querySelector('${selector}');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()
    `;
    const evalRes = await sendSession('Runtime.evaluate', { expression: expr, returnByValue: true });
    const rect = evalRes.result.value;
    if (!rect) {
      console.warn(`Element not found for selector: ${selector}`);
      return;
    }
    const clip = {
      x: Math.max(0, rect.x - pad),
      y: Math.max(0, rect.y - pad),
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
      scale: 1,
    };
    const { data } = await sendSession('Page.captureScreenshot', { clip });
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved element screenshot: ${filepath}`);
  }

  async function captureClip(clip, filepath) {
    const { data } = await sendSession('Page.captureScreenshot', { clip });
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved clip screenshot: ${filepath}`);
  }

  async function captureFullPage(filepath) {
    const { data } = await sendSession('Page.captureScreenshot', { captureBeyondViewport: true });
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved full page screenshot: ${filepath}`);
  }

  // --- 1. Audit Home Desktop (1440px) ---
  console.log('\n=== Auditing Home Desktop (1440px) ===');
  await navigate(`${BASE_URL}/ko`, 1440, 900, false);

  const desktopMetrics = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const photoSec = document.querySelector('.heroPhotoSection')?.getBoundingClientRect();
        const imgBox = document.querySelector('.heroImageBox')?.getBoundingClientRect();
        const quickSec = document.querySelector('.quickServiceSection')?.getBoundingClientRect();
        const track = document.querySelector('.cardScrollTrack')?.getBoundingClientRect();
        const cards = Array.from(document.querySelectorAll('.serviceCard')).map((c, i) => {
          const r = c.getBoundingClientRect();
          const label = c.querySelector('.cardLabel')?.textContent?.trim();
          const sub = c.querySelector('.cardSub')?.textContent?.trim();
          return { index: i + 1, label, sub: sub || null, width: Math.round(r.width), height: Math.round(r.height), left: Math.round(r.left) };
        });
        const textSec = document.querySelector('.heroTextSection')?.getBoundingClientRect();
        return {
          photoSectionWidth: Math.round(photoSec?.width || 0),
          imgBoxWidth: Math.round(imgBox?.width || 0),
          imgBoxHeight: Math.round(imgBox?.height || 0),
          quickSectionWidth: Math.round(quickSec?.width || 0),
          trackWidth: Math.round(track?.width || 0),
          cards,
          textSectionWidth: Math.round(textSec?.width || 0),
        };
      })()
    `,
    returnByValue: true,
  });

  console.log('Desktop Layout Metrics:', JSON.stringify(desktopMetrics.result.value, null, 2));

  // Capture Desktop Home Top (1440px)
  await captureClip(
    { x: 0, y: 0, width: 1440, height: 880, scale: 1 },
    path.join(V19_DIR, '홈_상단_데스크톱_1440.png')
  );

  // Capture Desktop 7-Card Row (focus)
  await captureElement('.quickServiceSection', path.join(V19_DIR, '홈_7개카드줄_데스크톱_1440.png'), 8);
  // Keep compatibility name
  await captureElement('.quickServiceSection', path.join(V19_DIR, '홈_6개카드줄_데스크톱_1440.png'), 8);

  // --- 2. Audit Home Mobile (390px) ---
  console.log('\n=== Auditing Home Mobile (390px) ===');
  await navigate(`${BASE_URL}/ko`, 390, 844, true);

  const mobileMetrics = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const photoSec = document.querySelector('.heroPhotoSection')?.getBoundingClientRect();
        const imgBox = document.querySelector('.heroImageBox')?.getBoundingClientRect();
        const quickSec = document.querySelector('.quickServiceSection')?.getBoundingClientRect();
        const track = document.querySelector('.cardScrollTrack');
        const cards = Array.from(document.querySelectorAll('.serviceCard')).map((c, i) => {
          const r = c.getBoundingClientRect();
          const label = c.querySelector('.cardLabel')?.textContent?.trim();
          return { index: i + 1, label, width: Math.round(r.width) };
        });
        return {
          photoSectionWidth: Math.round(photoSec?.width || 0),
          imgBoxHeight: Math.round(imgBox?.height || 0),
          scrollWidth: track?.scrollWidth,
          clientWidth: track?.clientWidth,
          cardsCount: cards.length,
          cards,
        };
      })()
    `,
    returnByValue: true,
  });

  console.log('Mobile Layout Metrics:', JSON.stringify(mobileMetrics.result.value, null, 2));

  // Capture Mobile Home Top (390px)
  await captureClip(
    { x: 0, y: 0, width: 390, height: 760, scale: 1 },
    path.join(V19_DIR, '홈_상단_모바일_390.png')
  );

  // Capture Mobile 7-Card Row
  await captureElement('.quickServiceSection', path.join(V19_DIR, '홈_7개카드줄_모바일_390.png'), 4);
  await captureElement('.quickServiceSection', path.join(V19_DIR, '홈_6개카드줄_모바일_390.png'), 4);

  // --- 3. Audit Activities Landing Page ---
  console.log('\n=== Auditing Activities Landing Page ===');
  // Desktop
  await navigate(`${BASE_URL}/ko/activities`, 1440, 900, false);
  await captureFullPage(path.join(V19_DIR, '액티비티_랜딩_데스크톱_1440.png'));

  // Mobile
  await navigate(`${BASE_URL}/ko/activities`, 390, 844, true);
  await captureFullPage(path.join(V19_DIR, '액티비티_랜딩_모바일_390.png'));

  // --- 4. Audit Emergency Landing Page ---
  console.log('\n=== Auditing Emergency Landing Page ===');
  // Desktop
  await navigate(`${BASE_URL}/ko/emergency`, 1440, 900, false);
  await captureFullPage(path.join(V19_DIR, '긴급상황_랜딩_데스크톱_1440.png'));

  // Mobile
  await navigate(`${BASE_URL}/ko/emergency`, 390, 844, true);
  await captureFullPage(path.join(V19_DIR, '긴급상황_랜딩_모바일_390.png'));

  // --- 5. Audit Itineraries Landing Page ---
  console.log('\n=== Auditing Itineraries Landing Page ===');
  // Desktop
  await navigate(`${BASE_URL}/ko/itineraries`, 1440, 900, false);
  await captureFullPage(path.join(V19_DIR, '추천테마일정_랜딩_데스크톱_1440.png'));

  // Mobile
  await navigate(`${BASE_URL}/ko/itineraries`, 390, 844, true);
  await captureFullPage(path.join(V19_DIR, '추천테마일정_랜딩_모바일_390.png'));

  ws.close();
  chromeProcess.kill();
  console.log('\nAll captures completed successfully!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
