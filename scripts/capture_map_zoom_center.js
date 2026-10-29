const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--remote-debugging-port=9280',
    '--remote-allow-origins=*',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
  ]);

  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9280/json/version');
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

  const outDirDrive = '/Users/admin/내 드라이브(namdo772@gmail.com)/Cowork/안티_우편함/map줌중앙_미리보기_2026-10-29';
  fs.mkdirSync(outDirDrive, { recursive: true });

  const port = 3009;

  const scenarios = [
    // PC 1440x900
    {
      file: '01_pc_1440_initial.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1440,
      height: 900,
      mobile: false,
      action: 'initial',
      desc: 'PC 1440x900: 처음 상태 (가로 전체 채움, 가로 중앙, 좌우 검은 여백 0)',
    },
    {
      file: '02_pc_1440_zoom_out_max.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1440,
      height: 900,
      mobile: false,
      action: 'zoom_out_max',
      desc: 'PC 1440x900: 최대 줌아웃 (cover 한계 유지, 검은 여백 0)',
    },
    {
      file: '03_pc_1440_zoom_in_drag_edge.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1440,
      height: 900,
      mobile: false,
      action: 'zoom_in_drag_edge',
      desc: 'PC 1440x900: 줌인 후 드래그로 가장자리까지 이동 (가장자리 clamp, 빈 공간 0)',
    },
    {
      file: '04_pc_1000_resize.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 1000,
      height: 900,
      mobile: false,
      action: 'initial',
      desc: 'PC 1000x900: 창 폭 1000으로 축소 상태 (중앙 유지, 빈 공간 0)',
    },
    // 태블릿 820x1180
    {
      file: '05_tablet_820_initial.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 820,
      height: 1180,
      mobile: true,
      action: 'initial',
      desc: '태블릿 820x1180: 처음 상태 (가로 전체 채움, 가로 중앙, 빈 공간 0)',
    },
    {
      file: '06_tablet_820_zoom_out_max.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 820,
      height: 1180,
      mobile: true,
      action: 'zoom_out_max',
      desc: '태블릿 820x1180: 최대 줌아웃 (cover 한계 유지, 빈 공간 0)',
    },
    // 모바일 390x844
    {
      file: '07_mobile_390_initial.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'initial',
      desc: '모바일 390x844: 처음 상태 (가로 전체 채움, 가로 중앙, 빈 공간 0)',
    },
    {
      file: '08_mobile_390_zoom_out_max.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'zoom_out_max',
      desc: '모바일 390x844: 최대 줌아웃 (cover 한계 유지, 빈 공간 0)',
    },
    {
      file: '09_mobile_390_zoom_in_drag_edge.png',
      url: `http://localhost:${port}/ko/map#food`,
      width: 390,
      height: 844,
      mobile: true,
      action: 'zoom_in_drag_edge',
      desc: '모바일 390x844: 줌인 후 가장자리 드래그 (가장자리 clamp, 빈 공간 0)',
    },
    // map-preview 동일 컴포넌트 검증
    {
      file: '10_map_preview_1440_check.png',
      url: `http://localhost:${port}/ko/map-preview`,
      width: 1440,
      height: 900,
      mobile: false,
      action: 'initial',
      desc: '/map-preview 1440x900: 동일 컴포넌트 적용 확인 (가로 채움, 빈 공간 0)',
    },
  ];

  const results = [];

  for (const s of scenarios) {
    console.log(`\n======================================================`);
    console.log(`[시나리오] ${s.file}`);
    console.log(`  설명: ${s.desc}`);
    console.log(`  화면: ${s.width}x${s.height}, URL: ${s.url}`);

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: s.width,
      height: s.height,
      deviceScaleFactor: 2,
      mobile: !!s.mobile,
    });

    // Reset page to ensure fresh state
    await sendSession('Page.navigate', { url: 'about:blank' });
    await new Promise((r) => setTimeout(r, 200));

    await sendSession('Page.navigate', { url: s.url });
    await new Promise((r) => setTimeout(r, 2200));

    // For /ko/map#food, ensure tab2 is active
    if (s.url.includes('/map#food')) {
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[role="tab"]'));
          if (btns.length >= 2 && btns[1].getAttribute('aria-selected') !== 'true') {
            btns[1].click();
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 800));
    }

    // Wait for image loaded and scale > 0
    await sendSession('Runtime.evaluate', {
      expression: `(() => {
        return new Promise((resolve) => {
          const check = () => {
            const img = document.querySelector('[class*="mapBgImg"]');
            if (img && img.complete && img.naturalWidth > 0) {
              resolve(true);
            } else {
              setTimeout(check, 100);
            }
          };
          check();
        });
      })()`,
      awaitPromise: true,
    });
    await new Promise((r) => setTimeout(r, 400));

    // Handle action
    if (s.action === 'zoom_out_max') {
      // Click zoom out button 6 times to hit minScale
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[class*="ctrlBtn"]'));
          const zoomOutBtn = btns.find(b => b.innerText.trim() === '-' || b.title.includes('Out'));
          if (zoomOutBtn) {
            for (let i = 0; i < 6; i++) {
              zoomOutBtn.click();
            }
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    } else if (s.action === 'zoom_in_drag_edge') {
      // Click zoom in 4 times, then simulate drag towards right & bottom
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btns = Array.from(document.querySelectorAll('button[class*="ctrlBtn"]'));
          const zoomInBtn = btns.find(b => b.innerText.trim() === '+' || b.title.includes('In'));
          if (zoomInBtn) {
            for (let i = 0; i < 4; i++) {
              zoomInBtn.click();
            }
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));

      // Drag to edge using pointer events on viewport
      await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const vp = document.querySelector('[class*="mapViewport"]');
          if (vp) {
            const rect = vp.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            vp.dispatchEvent(new PointerEvent('pointerdown', { clientX: startX, clientY: startY, bubbles: true }));
            // Drag violently 800px to the right and down to test edge clamping
            for (let d = 0; d <= 800; d += 80) {
              vp.dispatchEvent(new PointerEvent('pointermove', { clientX: startX + d, clientY: startY + d, bubbles: true }));
            }
            vp.dispatchEvent(new PointerEvent('pointerup', { clientX: startX + 800, clientY: startY + 800, bubbles: true }));
          }
        })()`,
      });
      await new Promise((r) => setTimeout(r, 600));
    }

    // Scroll map viewport into view nicely so full map area is visible in screenshot
    await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const vp = document.querySelector('[class*="mapViewport"]');
        if (vp) {
          const rect = vp.getBoundingClientRect();
          window.scrollBy(0, rect.top - 20);
        }
      })()`,
    });
    await new Promise((r) => setTimeout(r, 400));

    // Mathematical verification: compare BoundingClientRect of image vs container
    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const vp = document.querySelector('[class*="mapViewport"]');
        const img = document.querySelector('[class*="mapBgImg"]');
        if (!vp || !img) return { error: 'viewport or img not found' };

        const vpRect = vp.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        // Check if image covers viewport completely (0.5px margin of error for subpixel rendering)
        const leftGap = Math.max(0, imgRect.left - vpRect.left);
        const rightGap = Math.max(0, vpRect.right - imgRect.right);
        const topGap = Math.max(0, imgRect.top - vpRect.top);
        const bottomGap = Math.max(0, vpRect.bottom - imgRect.bottom);

        const hasBlackSpace = (leftGap > 0.5) || (rightGap > 0.5) || (topGap > 0.5) || (bottomGap > 0.5);

        // Horizontal centering diff
        const vpCenterX = vpRect.left + vpRect.width / 2;
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const centerDiffX = Math.abs(vpCenterX - imgCenterX);

        return {
          vpW: Math.round(vpRect.width),
          vpH: Math.round(vpRect.height),
          imgW: Math.round(imgRect.width),
          imgH: Math.round(imgRect.height),
          leftGap: Math.round(leftGap * 10) / 10,
          rightGap: Math.round(rightGap * 10) / 10,
          topGap: Math.round(topGap * 10) / 10,
          bottomGap: Math.round(bottomGap * 10) / 10,
          hasBlackSpace,
          centerDiffX: Math.round(centerDiffX * 10) / 10,
          imgLoaded: img.complete && img.naturalWidth > 0,
        };
      })()`,
      returnByValue: true,
    });

    const v = evalRes.result?.value;
    console.log(`  [검증 결과]:`);
    console.log(`    - 뷰포트 크기: ${v?.vpW}x${v?.vpH}px`);
    console.log(`    - 지도 이미지 크기: ${v?.imgW}x${v?.imgH}px`);
    console.log(`    - 여백(Gap): 좌:${v?.leftGap}px, 우:${v?.rightGap}px, 상:${v?.topGap}px, 하:${v?.bottomGap}px`);
    console.log(`    - 검은 빈 공간 존재 여부: ${v?.hasBlackSpace ? '발생 (ERROR)' : '완전 없음 (PASS)'}`);
    console.log(`    - 가로 중심 정렬 오차: ${v?.centerDiffX}px`);
    console.log(`    - 지도 이미지 로딩 완료: ${v?.imgLoaded}`);

    results.push({
      file: s.file,
      scenario: s.desc,
      v,
    });

    const { data: base64Data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
    });

    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(outDirDrive, s.file);
    fs.writeFileSync(filePath, buffer);
    console.log(`  ✓ 캡처 저장: ${filePath} (${buffer.length} bytes)`);
  }

  console.log(`\n======================================================`);
  console.log(`모든 ${scenarios.length}개 캡처 검증 완료: ${outDirDrive}`);
  ws.close();
  chromeProcess.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error('실행 실패:', err);
  process.exit(1);
});
