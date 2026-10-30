const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9255',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9255/json/version');
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

  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/Cowork/안티_우편함/map탭_미리보기_2026-10-29';
  fs.mkdirSync(outDirDrive, { recursive: true });

  const port = 3009;

  const tasks = [
    {
      file: '01_ko_mobile_tab1_landmarks_v2.png',
      url: `http://localhost:${port}/ko/map`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'landmarks',
    },
    {
      file: '02_ko_mobile_tab2_dining_v2.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining',
    },
    {
      file: '02b_ko_mobile_tab2_dining_zoom1_v2.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining_zoom',
    },
    {
      file: '03_ko_desktop_tab2_dining_v2.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1280,
      height: 900,
      mobile: false,
      action: 'dining',
    },
    {
      file: '04_zh_mobile_tab2_dining_v2.png',
      url: `http://localhost:${port}/zh/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining',
    },
    {
      file: '05_ru_mobile_tab2_dining_v2.png',
      url: `http://localhost:${port}/ru/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining',
    },
    {
      file: '06_ja_mobile_tab2_dining_v2.png',
      url: `http://localhost:${port}/ja/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining',
    },
    {
      file: '07_hi_mobile_tab2_dining_v2.png',
      url: `http://localhost:${port}/hi/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'dining',
    },
    {
      file: '08_ko_mobile_switch_tab1_to_tab2_v2.png',
      url: `http://localhost:${port}/ko/map`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'switch_to_dining',
    },
  ];

  for (const t of tasks) {
    console.log(`\n======================================================`);
    console.log(`[Task] ${t.file} (${t.width}px, action=${t.action})`);
    console.log(`  URL: ${t.url}`);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: !!t.mobile,
    });

    await sendSession('Page.navigate', { url: t.url });
    await new Promise((r) => setTimeout(r, 2200));

    // Handle user interaction per action
    if (t.action === 'dining') {
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
          if (btns.length >= 2) btns[1].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 1200));
    } else if (t.action === 'switch_to_dining') {
      // Start at tab1, wait, then click tab2 directly to simulate user click
      await new Promise((r) => setTimeout(r, 800));
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
          if (btns.length >= 2) btns[1].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 1200));
    } else if (t.action === 'dining_zoom') {
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
          if (btns.length >= 2) btns[1].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 1000));
      // Click zoom in button (+)
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const zoomBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('+') || b.textContent.includes('+'));
          if (zoomBtns.length > 0) zoomBtns[0].click();
        })()`,
      });
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Scroll to position map tabs and upper map viewport nicely
    await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
          const rect = tabList.getBoundingClientRect();
          window.scrollTo(0, window.scrollY + rect.top - 16);
        }
      })()`,
    });
    await new Promise((r) => setTimeout(r, 800));

    // Comprehensive Verification:
    // 1. Image load status (naturalWidth > 0, complete)
    // 2. Map viewport height & width > 0
    // 3. Computed CSS transform scale > 0
    // 4. Subtitle text check (no "92", contains "85")
    const verification = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const tabList = document.querySelector('[role="tablist"]');
        const activeTab = document.querySelector('button[role="tab"][aria-selected="true"]');
        const activeTabText = activeTab ? activeTab.innerText.trim().replace(/\\n/g, ' ') : null;

        // Check IllustMap Canvas & Image
        const canvas = document.querySelector('[class*="mapCanvas"]');
        const img = canvas ? canvas.querySelector('img') : null;
        const viewport = document.querySelector('[class*="mapViewport"]');

        let transformStyle = canvas ? canvas.style.transform : null;
        let scaleVal = null;
        if (transformStyle) {
          const m = transformStyle.match(/scale\\(([0-9.]+)\\)/);
          if (m) scaleVal = parseFloat(m[1]);
        }

        const imgLoaded = img ? (img.complete && img.naturalWidth > 0) : false;
        const imgDimensions = img ? { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, clientWidth: img.clientWidth, clientHeight: img.clientHeight } : null;
        const viewportDimensions = viewport ? { clientWidth: viewport.clientWidth, clientHeight: viewport.clientHeight } : null;

        // Subtitle check
        const headerTitleGroup = document.querySelector('[class*="headerTitleGroup"]');
        const subtitleText = headerTitleGroup ? headerTitleGroup.innerText.replace(/\\n/g, ' ') : null;
        const has92 = document.body.innerText.includes('92개') || document.body.innerText.includes('92家') || document.body.innerText.includes('92 лучших') || document.body.innerText.includes('92店舗') || document.body.innerText.includes('92 Curated');
        const has85 = document.body.innerText.includes('85');

        return {
          activeTabText,
          scaleVal,
          transformStyle,
          imgLoaded,
          imgDimensions,
          viewportDimensions,
          subtitleText,
          has92,
          has85,
        };
      })()`,
      returnByValue: true,
    });

    const v = verification.result?.value;
    console.log(`  [Verification Result]:`);
    console.log(`    - Active Tab: "${v?.activeTabText}"`);
    console.log(`    - Canvas Scale: ${v?.scaleVal} (Transform: "${v?.transformStyle}")`);
    console.log(`    - Image Loaded: ${v?.imgLoaded} (${v?.imgDimensions?.naturalWidth}x${v?.imgDimensions?.naturalHeight})`);
    console.log(`    - Viewport: ${v?.viewportDimensions?.clientWidth}x${v?.viewportDimensions?.clientHeight}`);
    console.log(`    - Subtitle: "${v?.subtitleText}"`);
    console.log(`    - Has '92': ${v?.has92} (Should be FALSE)`);
    console.log(`    - Has '85': ${v?.has85} (Should be TRUE)`);

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(outDirDrive, t.file);
    fs.writeFileSync(filePath, buffer);
    console.log(`  ✓ Saved: ${filePath} (${buffer.length} bytes)`);
  }

  console.log(`\n✓ All ${tasks.length} screenshots successfully captured to ${outDirDrive}`);
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
