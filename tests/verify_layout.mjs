import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4';

async function main() {
  console.log('Launching headless Chrome...');
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1280,1000',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_verify',
    'about:blank'
  ]);

  chromeProc.on('error', (err) => console.error('Chrome spawn error:', err));

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

  if (!wsUrl) {
    console.error('Failed to get WebSocket debugger URL from Chrome');
    chromeProc.kill();
    process.exit(1);
  }

  console.log('Connecting to Chrome CDP at:', wsUrl);
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

  // Create target directly with squaring 85 URL
  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/calculator?op=squaring&a=85' });
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

  console.log('Waiting for calculator page to load with 85²...');
  await new Promise(r => setTimeout(r, 4000));

  // Scroll to 3D Player section
  await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('section[aria-label="3D Educational Player"]') || document.querySelector('canvas');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });

  await new Promise(r => setTimeout(r, 1000));

  const sceneResults = [];

  for (let sceneIndex = 0; sceneIndex < 7; sceneIndex++) {
    console.log(`\n========================================`);
    console.log(`TESTING SCENE ${sceneIndex + 1} OF 7`);
    console.log(`========================================`);

    // Click the scene button
    await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const grid = document.querySelector('.grid.grid-cols-7');
          if (grid) {
            const btns = grid.querySelectorAll('button');
            if (btns[${sceneIndex}]) btns[${sceneIndex}].click();
          }
        })()
      `
    });

    // Wait for 3D camera and card transitions
    await new Promise(r => setTimeout(r, 1600));

    // Measure bounding boxes relative to 3D canvas container
    const evalResult = await sendSession('Runtime.evaluate', {
      expression: `
        (() => {
          const canvas = document.querySelector('canvas');
          if (!canvas) return null;
          const playerContainer = canvas.parentElement;
          const containerRect = playerContainer.getBoundingClientRect();

          function getRelativeBox(id) {
            const el = document.getElementById(id);
            if (!el) return null;
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            const opacity = parseFloat(style.opacity || '1');
            const display = style.display;
            const visibility = style.visibility;
            const isVisible = display !== 'none' && visibility !== 'hidden' && opacity > 0.1 && rect.width > 0 && rect.height > 0;
            return {
              id,
              visible: isVisible,
              opacity,
              relTop: Math.round(rect.top - containerRect.top),
              relBottom: Math.round(rect.bottom - containerRect.top),
              relLeft: Math.round(rect.left - containerRect.left),
              relRight: Math.round(rect.right - containerRect.left),
              height: Math.round(rect.height),
              width: Math.round(rect.width),
              text: el.innerText.trim().replace(/\\s+/g, ' ').slice(0, 60)
            };
          }

          const cardA = getRelativeBox('cardA');
          const lhsCard = getRelativeBox('lhsCard');
          const rhsCard = getRelativeBox('rhsCard');
          const combLhsCard = getRelativeBox('combLhsCard');
          const combRhsCard = getRelativeBox('combRhsCard');
          const fusedCard = getRelativeBox('fusedCard');
          const vrRing = getRelativeBox('vrRing');
          const caption = getRelativeBox('captionPanel');

          return {
            containerHeight: Math.round(containerRect.height),
            containerWidth: Math.round(containerRect.width),
            cardA,
            lhsCard,
            rhsCard,
            combLhsCard,
            combRhsCard,
            fusedCard,
            vrRing,
            caption
          };
        })()
      `,
      returnByValue: true
    });

    const data = evalResult.result.value;

    console.log(`Scene ${sceneIndex + 1} Metrics (Viewport height: ${data.containerHeight}px):`);
    console.log(`  Source Card (cardA):`, data.cardA?.visible ? `visible (relTop=${data.cardA.relTop}px, relBottom=${data.cardA.relBottom}px, h=${data.cardA.height}px) [${data.cardA.text}]` : 'hidden/inactive');

    // Identify active central card
    const centralCards = [data.lhsCard, data.rhsCard, data.combLhsCard, data.combRhsCard, data.fusedCard, data.vrRing].filter(c => c?.visible);
    centralCards.forEach(c => {
      console.log(`  Central Card (${c.id}): relTop=${c.relTop}px, relBottom=${c.relBottom}px, h=${c.height}px [${c.text}]`);
    });

    console.log(`  Caption Panel: relTop=${data.caption?.relTop}px, relBottom=${data.caption?.relBottom}px, h=${data.caption?.height}px [${data.caption?.text?.slice(0, 40)}]`);

    let overlapFound = false;

    // Check Zone 1 vs Zone 2
    if (data.cardA?.visible && centralCards.length > 0) {
      for (const c of centralCards) {
        const gapZ1Z2 = c.relTop - data.cardA.relBottom;
        console.log(`  -> Gap between Zone 1 (cardA) and Zone 2 (${c.id}): ${gapZ1Z2}px`);
        if (gapZ1Z2 <= 0) {
          console.error(`  ❌ OVERLAP DETECTED: cardA bottom (${data.cardA.relBottom}px) overlaps ${c.id} top (${c.relTop}px) by ${-gapZ1Z2}px!`);
          overlapFound = true;
        } else {
          console.log(`  ✅ CLEAN SEPARATION: ${gapZ1Z2}px gap between Zone 1 and Zone 2`);
        }
      }
    }

    // Check Zone 2 vs Zone 3 (Caption)
    if (data.caption?.visible && centralCards.length > 0) {
      for (const c of centralCards) {
        const gapZ2Z3 = data.caption.relTop - c.relBottom;
        console.log(`  -> Gap between Zone 2 (${c.id}) and Zone 3 (Caption): ${gapZ2Z3}px`);
        if (gapZ2Z3 <= 0) {
          console.error(`  ❌ OVERLAP DETECTED: ${c.id} bottom (${c.relBottom}px) overlaps Caption top (${data.caption.relTop}px) by ${-gapZ2Z3}px!`);
          overlapFound = true;
        } else {
          console.log(`  ✅ CLEAN SEPARATION: ${gapZ2Z3}px gap between Zone 2 and Zone 3`);
        }
      }
    }

    sceneResults.push({
      scene: sceneIndex + 1,
      overlapFound,
      cardA: data.cardA,
      centralCards,
      caption: data.caption
    });

    // Capture screenshot of the player area
    const shot = await sendSession('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    const shotPath = path.join(artifactDir, `scene_${sceneIndex + 1}_screenshot.png`);
    fs.writeFileSync(shotPath, buffer);
    console.log(`  Screenshot written to scene_${sceneIndex + 1}_screenshot.png`);
  }

  console.log('\n========================================');
  console.log('SUMMARY OF ALL SCENES:');
  console.log('========================================');
  let anyOverlap = false;
  sceneResults.forEach(r => {
    if (r.overlapFound) {
      console.error(`Scene ${r.scene}: FAILED (Overlap detected)`);
      anyOverlap = true;
    } else {
      console.log(`Scene ${r.scene}: PASSED (All 3 vertical zones separated cleanly)`);
    }
  });

  console.log('\nClosing Chrome...');
  await send('Browser.close');
  chromeProc.kill();

  if (anyOverlap) {
    console.error('\nOVERLAP DETECTED IN ONE OR MORE SCENES!');
    process.exit(1);
  } else {
    console.log('\nALL 7 SCENES PASSED WITH CLEAN SEPARATION!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
