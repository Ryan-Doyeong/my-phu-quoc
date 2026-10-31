const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const BASE_URL = 'http://localhost:3010/itineraries';
const OUT_DIR = '/Users/admin/내 드라이브(namdo772@gmail.com)/마이푸꾸옥/추천테마일정_스크린샷';

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Starting headless Chrome on port 9235...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9235',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9235/json/version');
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

  async function captureTarget({ filename, width, isMobile, elementId }) {
    console.log(`Capturing ${filename} (${width}px, mobile=${isMobile}, el=${elementId || 'full'})...`);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 2,
      mobile: isMobile,
      screenOrientation: isMobile ? { angle: 0, type: 'portraitPrimary' } : undefined,
    });

    await sendSession('Page.navigate', { url: BASE_URL });
    await new Promise((r) => setTimeout(r, 2200));

    if (elementId) {
      const boxRes = await sendSession('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${elementId}');
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
          })()
        `,
        returnByValue: true,
      });

      const box = boxRes.result.value;
      if (box && box.height > 0) {
        // Adjust viewport height to include element if needed
        const reqHeight = Math.max(900, Math.ceil(box.y + box.height + 100));
        await sendSession('Emulation.setDeviceMetricsOverride', {
          width,
          height: reqHeight,
          deviceScaleFactor: 2,
          mobile: isMobile,
          screenOrientation: isMobile ? { angle: 0, type: 'portraitPrimary' } : undefined,
        });
        await new Promise((r) => setTimeout(r, 300));

        const { data: base64Data } = await sendSession('Page.captureScreenshot', {
          format: 'png',
          clip: {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            scale: 1,
          },
        });
        const outPath = path.join(OUT_DIR, filename);
        fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
        console.log(`Saved ${filename}`);
        return;
      }
    }

    const layout = await sendSession('Page.getLayoutMetrics');
    const contentHeight = Math.ceil(layout.contentSize.height);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height: contentHeight,
      deviceScaleFactor: 2,
      mobile: isMobile,
      screenOrientation: isMobile ? { angle: 0, type: 'portraitPrimary' } : undefined,
    });
    await new Promise((r) => setTimeout(r, 400));

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width,
        height: contentHeight,
        scale: 1,
      },
    });

    const outPath = path.join(OUT_DIR, filename);
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${filename}`);
  }

  // 1. 질문 화면
  await captureTarget({ filename: '01_질문화면_데스크톱.png', width: 1280, isMobile: false, elementId: 'plan-customizer' });
  await captureTarget({ filename: '01_질문화면_모바일.png', width: 390, isMobile: true, elementId: 'plan-customizer' });

  // 2. 샘플 일정
  await captureTarget({ filename: '02_샘플일정_데스크톱.png', width: 1280, isMobile: false, elementId: 'plan-sample' });
  await captureTarget({ filename: '02_샘플일정_모바일.png', width: 390, isMobile: true, elementId: 'plan-sample' });

  // 3. 일정표
  await captureTarget({ filename: '03_일정표_데스크톱.png', width: 1280, isMobile: false, elementId: 'plan-schedule' });
  await captureTarget({ filename: '03_일정표_모바일.png', width: 390, isMobile: true, elementId: 'plan-schedule' });

  // 4. 옵션 카드
  await captureTarget({ filename: '04_옵션카드_데스크톱.png', width: 1280, isMobile: false, elementId: 'plan-options' });
  await captureTarget({ filename: '04_옵션카드_모바일.png', width: 390, isMobile: true, elementId: 'plan-options' });

  // 5. 예약 폼
  await captureTarget({ filename: '05_예약폼_데스크톱.png', width: 1280, isMobile: false, elementId: 'plan-booking' });
  await captureTarget({ filename: '05_예약폼_모바일.png', width: 390, isMobile: true, elementId: 'plan-booking' });

  // 6. 전체 화면
  await captureTarget({ filename: '06_전체화면_데스크톱.png', width: 1280, isMobile: false });
  await captureTarget({ filename: '06_전체화면_모바일.png', width: 390, isMobile: true });

  ws.close();
  chromeProcess.kill();
  console.log('\nAll captures completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
