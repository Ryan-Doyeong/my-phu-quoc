const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const OUT_DIRS = [
  '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/docs/progress/screenshots',
  '/tmp/test-repo/docs/progress/screenshots'
];

async function main() {
  console.log('Launching Chrome to verify /ko/hotels render and console errors...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9250',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,1200'
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9250/json/version');
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

  const consoleErrors = [];
  const jsExceptions = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      if (msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
    } else if (msg.method === 'Runtime.exceptionThrown') {
      jsExceptions.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
    }

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
  await sendSession('Runtime.enable');

  function saveScreenshot(filename, dataBase64) {
    const buf = Buffer.from(dataBase64, 'base64');
    for (const d of OUT_DIRS) {
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, filename), buf);
    }
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Navigate to /ko/hotels
  console.log('\nNavigating to http://localhost:3008/ko/hotels ...');
  await sendSession('Page.navigate', { url: 'http://localhost:3008/ko/hotels' });
  await new Promise((r) => setTimeout(r, 4000));

  // Check card count and error text
  const evalSunset = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const bodyText = document.body.innerText;
        const hasErrorText = bodyText.includes('일시적인 오류가 발생했습니다') || bodyText.includes('An unexpected error has occurred');
        const cards = document.querySelectorAll('.hotelCard');
        const cardTitles = Array.from(cards).map(c => c.querySelector('.cardTitle')?.innerText);
        return {
          hasErrorText,
          cardCount: cards.length,
          cardTitles
        };
      })()
    `,
    returnByValue: true
  });

  const sunsetResult = evalSunset.result.value;
  console.log(`Sunset Town check: hasErrorText=${sunsetResult.hasErrorText}, cardCount=${sunsetResult.cardCount}`);
  console.log(`Titles count: ${sunsetResult.cardTitles.length}`);

  // Screenshot 1: Sunset Town Top Overview
  let shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  saveScreenshot('2026-11-03_hotels_sunset_town_overview.png', shot.data);

  // Scroll to Merci Hotel card and capture
  await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.hotelCard'));
        const target = cards.find(c => c.innerText.includes('MERCI HOTEL'));
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 1000));
  shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  saveScreenshot('2026-11-03_hotels_card_merci.png', shot.data);

  // Scroll to Blue Hotel card and capture
  await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.hotelCard'));
        const target = cards.find(c => c.innerText.includes('Blue Hotel'));
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 1000));
  shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  saveScreenshot('2026-11-03_hotels_card_blue.png', shot.data);

  // Scroll to Rosie Hillside card and capture
  await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.hotelCard'));
        const target = cards.find(c => c.innerText.includes('로지 힐사이드'));
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 1000));
  shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  saveScreenshot('2026-11-03_hotels_card_rosie.png', shot.data);

  // 2. Navigate to /ko/hotels?area=khem-beach
  console.log('\nNavigating to http://localhost:3008/ko/hotels?area=khem-beach ...');
  await sendSession('Page.navigate', { url: 'http://localhost:3008/ko/hotels?area=khem-beach' });
  await new Promise((r) => setTimeout(r, 4000));

  const evalKhem = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const bodyText = document.body.innerText;
        const hasErrorText = bodyText.includes('일시적인 오류가 발생했습니다') || bodyText.includes('An unexpected error has occurred');
        const cards = document.querySelectorAll('.hotelCard');
        return {
          hasErrorText,
          cardCount: cards.length
        };
      })()
    `,
    returnByValue: true
  });

  const khemResult = evalKhem.result.value;
  console.log(`Khem Beach check: hasErrorText=${khemResult.hasErrorText}, cardCount=${khemResult.cardCount}`);

  shot = await sendSession('Page.captureScreenshot', { format: 'png' });
  saveScreenshot('2026-11-03_hotels_khem_beach_verified.png', shot.data);

  console.log('\n--- Console Errors & Exceptions Report ---');
  console.log(`Console errors (${consoleErrors.length}):`, consoleErrors);
  console.log(`JS Exceptions (${jsExceptions.length}):`, jsExceptions);

  try {
    await send('Target.closeTarget', { targetId });
    ws.close();
  } catch {}
  chromeProcess.kill();

  if (consoleErrors.length > 0 || jsExceptions.length > 0 || sunsetResult.hasErrorText || khemResult.hasErrorText) {
    console.error('VERIFICATION FAILED: Errors detected!');
    process.exit(1);
  }

  if (sunsetResult.cardCount !== 42) {
    console.error(`VERIFICATION FAILED: Expected 42 cards on Sunset Town, got ${sunsetResult.cardCount}`);
    process.exit(1);
  }

  if (khemResult.cardCount !== 7) {
    console.error(`VERIFICATION FAILED: Expected 7 cards on Khem Beach, got ${khemResult.cardCount}`);
    process.exit(1);
  }

  console.log('\nALL VERIFICATIONS PASSED PERFECTLY!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
