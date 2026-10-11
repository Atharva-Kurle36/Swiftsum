import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTest() {
  console.log('Launching headless Chrome for Multi-Method & Responsive Testing...');
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1280,1000',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_multi',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) throw new Error('No WebSocket URL');
  const ws = new WebSocket(wsUrl);

  let idCounter = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };
  await new Promise((resolve) => ws.onopen = resolve);

  function send(method, params = {}) {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // 2D box intersection test
  function boxesIntersect(a, b) {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }

  async function testUrlAndSizes(name, url, viewports) {
    console.log(`\n========================================`);
    console.log(`TEST SUITE: ${name} (${url})`);
    console.log(`========================================`);

    const { targetId } = await send('Target.createTarget', { url });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    function sendSession(method, params = {}) {
      const id = idCounter++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, sessionId, method, params }));
      });
    }

    await sendSession('Page.enable');
    await sendSession('Runtime.enable');
    await new Promise(r => setTimeout(r, 3500));

    for (const vp of viewports) {
      console.log(`\n--- Testing Viewport: ${vp.width}x${vp.height} ---`);
      await sendSession('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768
      });
      await new Promise(r => setTimeout(r, 500));

      // Test scenes 2, 3, 4, 5
      for (const sceneIdx of [1, 2, 3, 4]) {
        await sendSession('Runtime.evaluate', {
          expression: `
            (() => {
              const grid = document.querySelector('.grid.grid-cols-7');
              if (grid) {
                const btns = grid.querySelectorAll('button');
                if (btns[${sceneIdx}]) btns[${sceneIdx}].click();
              }
            })()
          `
        });
        await new Promise(r => setTimeout(r, 1200));

        const res = await sendSession('Runtime.evaluate', {
          expression: `
            (() => {
              const canvas = document.querySelector('canvas');
              if (!canvas) return null;
              const container = canvas.parentElement;
              const cRect = container.getBoundingClientRect();

              function getRel(id) {
                const el = document.getElementById(id);
                if (!el) return null;
                const r = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                const isVis = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0.1 && r.width > 0 && r.height > 0;
                return {
                  id,
                  visible: isVis,
                  top: Math.round(r.top - cRect.top),
                  bottom: Math.round(r.bottom - cRect.top),
                  left: Math.round(r.left - cRect.left),
                  right: Math.round(r.right - cRect.left),
                  height: Math.round(r.height),
                  width: Math.round(r.width),
                  text: el.innerText.trim().slice(0, 30)
                };
              }

              return {
                cardA: getRel('cardA'),
                cardB: getRel('cardB'),
                basePillar: getRel('basePillar'),
                lhs: getRel('lhsCard'),
                rhs: getRel('rhsCard'),
                caption: getRel('captionPanel'),
                cH: Math.round(cRect.height),
                cW: Math.round(cRect.width)
              };
            })()
          `,
          returnByValue: true
        });

        const d = res.result.value;
        const visibleCards = [d.cardA, d.cardB, d.basePillar, d.lhs, d.rhs, d.caption].filter(c => c?.visible);

        // Check every pair of active cards for 2D overlap
        for (let i = 0; i < visibleCards.length; i++) {
          for (let j = i + 1; j < visibleCards.length; j++) {
            const c1 = visibleCards[i];
            const c2 = visibleCards[j];
            if (boxesIntersect(c1, c2)) {
              console.error(`  ❌ Scene ${sceneIdx + 1} (${vp.width}w): OVERLAP between ${c1.id} and ${c2.id}!`);
              console.error(`     ${c1.id}: [T:${c1.top}, B:${c1.bottom}, L:${c1.left}, R:${c1.right}]`);
              console.error(`     ${c2.id}: [T:${c2.top}, B:${c2.bottom}, L:${c2.left}, R:${c2.right}]`);
              throw new Error(`2D Overlap between ${c1.id} and ${c2.id}`);
            }
          }
        }

        console.log(`  ✓ Scene ${sceneIdx + 1} (${vp.width}w): All ${visibleCards.length} active cards have zero 2D intersection! (PASS)`);
      }
    }

    await send('Target.closeTarget', { targetId });
  }

  // 1. Ekadhikena 85² on Mobile (420), Tablet (768), Desktop (1280)
  await testUrlAndSizes('Ekadhikena 85²', 'http://localhost:3000/calculator?op=squaring&a=85', [
    { width: 1280, height: 900 },
    { width: 768, height: 900 },
    { width: 420, height: 850 }
  ]);

  // 2. General Duplex 43²
  await testUrlAndSizes('General Duplex 43²', 'http://localhost:3000/calculator?op=squaring&a=43', [
    { width: 1280, height: 900 },
    { width: 768, height: 900 }
  ]);

  // 3. Yavadunam 12²
  await testUrlAndSizes('Yavadunam 12²', 'http://localhost:3000/calculator?op=squaring&a=12', [
    { width: 1280, height: 900 },
    { width: 768, height: 900 }
  ]);

  // 4. Multiplication 98 × 97
  await testUrlAndSizes('Multiplication 98 × 97', 'http://localhost:3000/calculator?op=multiplication&a=98&b=97', [
    { width: 1280, height: 900 }
  ]);

  console.log('\n========================================');
  console.log('ALL MULTI-METHOD & RESPONSIVE SUITES PASSED!');
  console.log('========================================');

  await send('Browser.close');
  chromeProc.kill();
}

runTest().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
