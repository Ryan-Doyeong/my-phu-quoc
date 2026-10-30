const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9244',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9244/json/version');
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
      file: '01_ko_mobile_tab1_landmarks.png',
      url: `http://localhost:${port}/ko/map`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'landmarks',
    },
    {
      file: '02_ko_mobile_tab2_dining.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'dining',
    },
    {
      file: '03_ko_desktop_tab2_dining.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1280,
      height: 900,
      mobile: false,
      tab: 'dining',
    },
    {
      file: '04_zh_mobile_tab2_dining.png',
      url: `http://localhost:${port}/zh/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'dining',
    },
    {
      file: '05_ru_mobile_tab2_dining.png',
      url: `http://localhost:${port}/ru/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'dining',
    },
    {
      file: '06_ja_mobile_tab2_dining.png',
      url: `http://localhost:${port}/ja/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'dining',
    },
    {
      file: '07_hi_mobile_tab2_dining.png',
      url: `http://localhost:${port}/hi/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      tab: 'dining',
    },
  ];

  for (const t of tasks) {
    console.log(`[Capture] ${t.file} (${t.width}px, ${t.tab}) from ${t.url}`);
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: 2,
      mobile: !!t.mobile,
    });

    await sendSession('Page.navigate', { url: t.url });
    // Allow React hydrate, image loading, and tab switch
    await new Promise((r) => setTimeout(r, 2500));

    // If tab is dining, click the dining tab or evaluate state to ensure tab switch
    if (t.tab === 'dining') {
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
          if (btns.length >= 2) {
            btns[1].click();
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 1200));
    }

    // Scroll to slightly below header so the map tabs and map content are perfectly centered
    await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
          const rect = tabList.getBoundingClientRect();
          window.scrollTo(0, window.scrollY + rect.top - 20);
        }
      })()`,
    });
    await new Promise((r) => setTimeout(r, 600));

    // Verify presence of elements
    const verifyResult = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const tabList = document.querySelector('[role="tablist"]');
        const activeTab = document.querySelector('button[role="tab"][aria-selected="true"]');
        const text = document.body.innerText;
        const has85 = text.includes('85');
        const has12 = text.includes('12');
        return {
          tabListExists: !!tabList,
          activeTabText: activeTab ? activeTab.innerText.trim() : null,
          has85,
          has12,
        };
      })()`,
      returnByValue: true,
    });
    console.log(`  Verify:`, JSON.stringify(verifyResult.result?.value));

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(outDirDrive, t.file);
    fs.writeFileSync(filePath, buffer);
    console.log(`  Saved: ${filePath} (${buffer.length} bytes)`);
  }

  console.log(`\n✓ All ${tasks.length} screenshots successfully captured to ${outDirDrive}`);
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
