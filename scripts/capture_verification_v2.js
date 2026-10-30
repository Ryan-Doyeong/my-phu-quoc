const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = '/Users/admin/내 드라이브(namdo772@gmail.com)/마이푸꾸옥/메인개편_시안/사이트반영_로컬검증';

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Starting headless Chrome...');
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9225/json/version');
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

  const overflowResults = [];

  // 1. 측정 및 캡처 함수
  async function capturePage({ urlPath, filename, width, height, isMobile }) {
    console.log(`\nNavigating to ${urlPath} with width=${width}, mobile=${isMobile}...`);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
      screenOrientation: isMobile ? { angle: 0, type: 'portraitPrimary' } : undefined,
    });

    if (isMobile) {
      await sendSession('Emulation.setTouchEmulationEnabled', { enabled: true });
    } else {
      await sendSession('Emulation.setTouchEmulationEnabled', { enabled: false });
    }

    await sendSession('Page.navigate', { url: `${BASE_URL}${urlPath}` });
    await new Promise((r) => setTimeout(r, 2500));

    // 레이아웃 메트릭스 및 가로 스크롤/가로 넘침 측정
    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const innerWidth = window.innerWidth;
          const hasOverflow = scrollWidth > clientWidth;
          return {
            scrollWidth,
            clientWidth,
            innerWidth,
            hasOverflow,
            diff: scrollWidth - clientWidth
          };
        })()
      `,
      returnByValue: true,
    });

    const metrics = evalRes.result.value;
    console.log(`Metrics for ${urlPath} (${width}px):`, metrics);
    overflowResults.push({
      page: urlPath,
      width,
      isMobile,
      ...metrics,
    });

    // 풀페이지 캡처를 위해 실제 레이아웃 크기 가져오기
    const layout = await sendSession('Page.getLayoutMetrics');
    const contentHeight = Math.ceil(layout.contentSize.height);

    console.log(`Capturing full page (${width}x${contentHeight}) -> ${filename}`);
    
    // 전체 페이지 높이로 디바이스 메트릭 임시 확장
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

    fs.writeFileSync(path.join(OUT_DIR, filename), Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${filename}`);
  }

  // 2. 주요 페이지 데스크톱 1440, 모바일 390, 모바일 360 캡처
  const pages = [
    {
      urlPath: '/',
      desktop: '검증_홈_데스크톱_1440_v2.png',
      m390: '검증_홈_모바일_390_v2.png',
      m360: '검증_홈_모바일_360_v2.png',
    },
    {
      urlPath: '/buggy-tour',
      desktop: '검증_버기투어_데스크톱_1440_v2.png',
      m390: '검증_버기투어_모바일_390_v2.png',
      m360: '검증_버기투어_모바일_360_v2.png',
    },
    {
      urlPath: '/taxi-tour',
      desktop: '검증_택시투어_데스크톱_1440_v2.png',
      m390: '검증_택시투어_모바일_390_v2.png',
      m360: '검증_택시투어_모바일_360_v2.png',
    },
  ];

  for (const p of pages) {
    // 1440px 데스크톱
    await capturePage({
      urlPath: p.urlPath,
      filename: p.desktop,
      width: 1440,
      height: 900,
      isMobile: false,
    });

    // 390px 모바일
    await capturePage({
      urlPath: p.urlPath,
      filename: p.m390,
      width: 390,
      height: 844,
      isMobile: true,
    });

    // 360px 모바일
    await capturePage({
      urlPath: p.urlPath,
      filename: p.m360,
      width: 360,
      height: 800,
      isMobile: true,
    });
  }

  // 3. 모바일(390px)에서 홈 배너 3장 각각 캡처
  console.log('\nCapturing individual mobile banners (1, 2, 3)...');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
    screenOrientation: { angle: 0, type: 'portraitPrimary' },
  });
  await sendSession('Emulation.setTouchEmulationEnabled', { enabled: true });
  await sendSession('Page.navigate', { url: `${BASE_URL}/` });
  await new Promise((r) => setTimeout(r, 2000));

  // 배너 요소의 clip 사각형 구하기
  const bannerBoxRes = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('mrt-banner-section');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      })()
    `,
    returnByValue: true,
  });

  const bannerBox = bannerBoxRes.result.value;
  console.log('Banner section bounding box:', bannerBox);

  // 배너 슬라이드별 캡처 (1, 2, 3)
  for (let targetIndex = 1; targetIndex <= 3; targetIndex++) {
    console.log(`Waiting for banner slide ${targetIndex} / 3...`);
    
    // JS로 직접 해당 슬라이드로 이동시키거나 슬라이드 감지
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const track = document.getElementById('mrtSlideTrack');
          const counter = document.getElementById('currentSlideNum');
          if (track) {
            track.style.transition = 'none';
            track.style.transform = 'translateX(-${(targetIndex - 1) * 100}%)';
          }
          if (counter) {
            counter.innerText = '${targetIndex}';
          }
        })()
      `,
    });
    await new Promise((r) => setTimeout(r, 400));

    const { data: bannerData } = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, bannerBox.x),
        y: Math.max(0, bannerBox.y),
        width: bannerBox.width,
        height: bannerBox.height,
        scale: 1,
      },
    });

    const bannerFile = `배너3장_모바일_v2_${targetIndex}.png`;
    fs.writeFileSync(path.join(OUT_DIR, bannerFile), Buffer.from(bannerData, 'base64'));
    console.log(`Saved ${bannerFile}`);
  }

  // 4. 결과 출력
  console.log('\n========================================');
  console.log('OVERFLOW MEASUREMENT RESULTS:');
  console.table(overflowResults);
  console.log('========================================\n');

  chromeProcess.kill();
  console.log('Done!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
