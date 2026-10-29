const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9277',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9277/json/version');
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

  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/Cowork/안티_우편함/map아코디언_미리보기_2026-10-29';
  fs.mkdirSync(outDirDrive, { recursive: true });

  const port = 3009;

  const tasks = [
    {
      file: '01_ko_mobile_initial_central_only.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
    },
    {
      file: '02_ko_mobile_multi_open.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'open_second_block',
    },
    {
      file: '03_ko_mobile_show_more_expanded.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'expand_show_more',
    },
    {
      file: '04_ko_mobile_pin_clicked_accordion_open.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'click_map_pin',
    },
    {
      file: '05_ko_mobile_filter_bars_zero_hidden.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'filter_bars',
    },
    {
      file: '06_ko_desktop_initial.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1280,
      height: 900,
      mobile: false,
      action: 'initial',
    },
    {
      file: '07_zh_mobile_initial.png',
      url: `http://localhost:${port}/zh/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
    },
    {
      file: '08_ru_mobile_initial.png',
      url: `http://localhost:${port}/ru/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
    },
    {
      file: '09_ja_mobile_initial.png',
      url: `http://localhost:${port}/ja/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
    },
    {
      file: '10_hi_mobile_initial.png',
      url: `http://localhost:${port}/hi/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
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

    // Reset to about:blank to ensure fresh clean React state on each task
    await sendSession('Page.navigate', { url: 'about:blank' });
    await new Promise((r) => setTimeout(r, 200));

    await sendSession('Page.navigate', { url: t.url });
    await new Promise((r) => setTimeout(r, 2200));

    // Ensure tab2 is active
    await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
        if (btns.length >= 2 && btns[1].getAttribute('aria-selected') !== 'true') {
          btns[1].click();
        }
      })()`,
    });
    await new Promise((r) => setTimeout(r, 800));

    // Handle specific action and scroll positioning
    if (t.action === 'open_second_block') {
      // Click the 2nd accordion header to test multiple open
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const headers = Array.from(document.querySelectorAll('button[id^="accordion-header-"]'));
          if (headers.length >= 2) {
            headers[1].click();
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));

      // Scroll so that the 2nd header and its cards are clearly visible
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const headers = Array.from(document.querySelectorAll('button[id^="accordion-header-"]'));
          if (headers.length >= 2) {
            headers[1].scrollIntoView({ block: 'start', behavior: 'instant' });
            window.scrollBy(0, -60);
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    } else if (t.action === 'expand_show_more') {
      // Find and click the "더 보기" button
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button')).filter(b => (b.innerText || '').includes('더 보기') || (b.innerText || '').includes('Show More'));
          if (btns.length > 0) {
            btns[0].click();
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));

      // Scroll so the newly shown cards (7, 8) and '접기' button are centered
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button')).filter(b => (b.innerText || '').includes('접기') || (b.innerText || '').includes('Show Less'));
          if (btns.length > 0) {
            btns[0].scrollIntoView({ block: 'center', behavior: 'instant' });
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    } else if (t.action === 'click_map_pin') {
      // First scroll up to make map visible
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          window.scrollTo(0, 300);
        })()`,
      });
      await new Promise((r) => setTimeout(r, 400));

      // Click a pin on map canvas (marker #2, VENICE_MID)
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const markers = Array.from(document.querySelectorAll('[class*="blockMarker"]'));
          if (markers.length >= 3) {
            markers[2].click();
          }
        })()`,
      });
      // Allow smooth scroll to finish
      await new Promise((r) => setTimeout(r, 1200));
    } else if (t.action === 'filter_bars') {
      // Click '바 & 펍' filter button
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const filterBtns = Array.from(document.querySelectorAll('[class*="filterBtn"]'));
          if (filterBtns.length >= 3) {
            filterBtns[2].click();
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 800));

      // Scroll to filter controls
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const filterBar = document.querySelector('[class*="filterControls"]');
          if (filterBar) {
            filterBar.scrollIntoView({ block: 'start', behavior: 'instant' });
            window.scrollBy(0, -20);
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    } else {
      // Initial state: scroll to accordion list top
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const accordionList = document.querySelector('[class*="districtAccordionList"]');
          if (accordionList) {
            accordionList.scrollIntoView({ block: 'start', behavior: 'instant' });
            window.scrollBy(0, -60);
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    }

    // Verification
    const verification = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const headers = Array.from(document.querySelectorAll('button[id^="accordion-header-"]'));
        const openHeaders = headers.filter(h => h.getAttribute('aria-expanded') === 'true');
        const openBlockNames = openHeaders.map(h => (h.innerText || '').slice(0, 30));
        const totalAccordionItems = document.querySelectorAll('[class*="districtAccordionItem"]').length;

        const cards = document.querySelectorAll('[class*="verticalVenueCard"]');
        const showMoreBtns = Array.from(document.querySelectorAll('button')).filter(b => (b.innerText || '').includes('더 보기') || (b.innerText || '').includes('Show More') || (b.innerText || '').includes('접기') || (b.innerText || '').includes('Show Less'));

        // Check horizontal scroll on accordion & body
        const accordionList = document.querySelector('[class*="districtAccordionList"]');
        const accordionHasScroll = accordionList ? accordionList.scrollWidth > accordionList.clientWidth : false;

        const bodyScrollWidth = document.body.scrollWidth;
        const windowInnerWidth = window.innerWidth;
        const bodyHasHorizontalScroll = bodyScrollWidth > windowInnerWidth;

        // Find any overflowing elements if bodyHasHorizontalScroll is true
        const overflowing = [];
        if (bodyHasHorizontalScroll) {
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > windowInnerWidth + 1) {
              overflowing.push(el.tagName + '.' + el.className.toString().slice(0, 30) + ' (right:' + Math.round(r.right) + ' > win:' + windowInnerWidth + ')');
            }
          });
        }

        // Image check
        const img = document.querySelector('[class*="mapCanvas"] img');
        const imgLoaded = img ? (img.complete && img.naturalWidth > 0) : false;

        return {
          totalAccordionItems,
          openCount: openHeaders.length,
          openBlockNames,
          visibleCardCount: cards.length,
          showMoreBtnCount: showMoreBtns.length,
          accordionHasScroll,
          bodyHasHorizontalScroll,
          overflowing: overflowing.slice(0, 5),
          imgLoaded,
        };
      })()`,
      returnByValue: true,
    });

    if (verification.exceptionDetails) {
      console.error('  EVAL ERROR:', verification.exceptionDetails);
    }
    const v = verification.result?.value;
    console.log(`  [Verification]:`);
    console.log(`    - Total District Items: ${v?.totalAccordionItems}`);
    console.log(`    - Open Districts: ${v?.openCount} (${JSON.stringify(v?.openBlockNames)})`);
    console.log(`    - Visible Cards: ${v?.visibleCardCount}`);
    console.log(`    - Accordion Horizontal Scroll: ${v?.accordionHasScroll} (Must be FALSE)`);
    console.log(`    - Body Horizontal Scroll: ${v?.bodyHasHorizontalScroll}`);
    if (v?.overflowing && v?.overflowing.length > 0) {
      console.log(`    - Overflow elements:`, v?.overflowing);
    }
    console.log(`    - Map Image Loaded: ${v?.imgLoaded}`);

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
  console.error('Capture failed:', err);
  process.exit(1);
});
