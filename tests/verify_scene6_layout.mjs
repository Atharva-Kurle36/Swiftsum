import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4';

async function main() {
  console.log('Launching headless Chrome for Scene 6 Layout & Overlap verification...');
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--window-size=1280,1000',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_s6',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9226/json/version');
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

  await new Promise(resolve => ws.onopen = resolve);

  function send(method, params = {}) {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/calculator?op=subtraction&a=1000&b=347' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    const id = idCounter++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ sessionId, id, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');
  await sendSession('DOM.enable');

  console.log('Waiting for page load...');
  await new Promise(r => setTimeout(r, 3500));

  async function evalExpr(expression) {
    const res = await sendSession('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result?.value;
  }

  const webglStatus = await evalExpr(`
    (() => {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      const hasCanvas = !!document.querySelector('canvas');
      const has2D = !!document.querySelector('div[aria-label="2D Geometric Step Fallback"]');
      return { webglSupported: !!gl, hasCanvas, has2D };
    })()
  `);
  console.log('WebGL status:', JSON.stringify(webglStatus));

  // Scroll into view
  await evalExpr(`
    (() => {
      const player = document.querySelector('section[aria-label="3D Educational Player"]') || document.querySelector('#captionPanel');
      if (player) player.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()
  `);
  await new Promise(r => setTimeout(r, 1000));

  // Jump to Scene 6
  console.log('Jumping to Scene 6...');
  const clickRes = await evalExpr(`
    (() => {
      const chapterContainer = document.querySelector('div.grid-cols-7');
      if (!chapterContainer) return 'NO chapterContainer found';
      const btns = Array.from(chapterContainer.querySelectorAll('button'));
      const texts = btns.map(b => b.innerText);
      if (btns[5]) {
        btns[5].click();
        return { clicked: texts[5], all: texts };
      }
      return { error: 'btn 5 not found', all: texts };
    })()
  `);
  console.log('Chapter buttons info:', JSON.stringify(clickRes));
  await new Promise(r => setTimeout(r, 2500));

  // Measure bounding rects of #fusedCard and #captionPanel
  const layoutMetrics = await evalExpr(`
    (() => {
      const card = document.querySelector('#fusedCard');
      const caption = document.querySelector('#captionPanel');
      const viewport = card ? card.closest('.relative') : null;

      if (!card || !caption) {
        return { error: 'Elements not found', hasCard: !!card, hasCaption: !!caption };
      }

      const cardRect = card.getBoundingClientRect();
      const captionRect = caption.getBoundingClientRect();
      const gap = captionRect.top - cardRect.bottom;

      return {
        card: {
          top: Math.round(cardRect.top),
          bottom: Math.round(cardRect.bottom),
          height: Math.round(cardRect.height),
          left: Math.round(cardRect.left),
          width: Math.round(cardRect.width),
          text: card.innerText
        },
        caption: {
          top: Math.round(captionRect.top),
          bottom: Math.round(captionRect.bottom),
          height: Math.round(captionRect.height),
          left: Math.round(captionRect.left),
          width: Math.round(captionRect.width),
          text: caption.innerText
        },
        gapPixels: Math.round(gap),
        isOverlapping: gap < 0
      };
    })()
  `);

  console.log('\n--- SCENE 6 LAYOUT MEASUREMENTS ---');
  console.log(JSON.stringify(layoutMetrics, null, 2));

  if (layoutMetrics.isOverlapping) {
    console.error(`FAILED: #fusedCard and #captionPanel overlap by ${Math.abs(layoutMetrics.gapPixels)}px!`);
  } else {
    console.log(`SUCCESS: Clear gap of ${layoutMetrics.gapPixels}px between result card and caption panel!`);
  }

  // Capture screenshot of Scene 6
  const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'scene_6_fixed_layout.png'), Buffer.from(data, 'base64'));
  console.log('Saved scene_6_fixed_layout.png');

  // Verify all other scenes for overlap
  console.log('\n--- VERIFYING ALL 7 SCENES FOR OVERLAPS ---');
  for (let sc = 1; sc <= 7; sc++) {
    await evalExpr(`
      (() => {
        const chapterContainer = document.querySelector('div.grid-cols-7');
        if (chapterContainer) {
          const btns = chapterContainer.querySelectorAll('button');
          if (btns[${sc - 1}]) btns[${sc - 1}].click();
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 1500));

    const checkOverlap = await evalExpr(`
      (() => {
        const caption = document.querySelector('#captionPanel');
        if (!caption) return { error: 'No caption' };
        const capRect = caption.getBoundingClientRect();

        // Check active visible 3D card IDs
        const cardIds = ['cardA', 'cardB', 'basePillarCard', 'lhsCard', 'rhsCard', 'fusedCard', 'vrRing'];
        const overlaps = [];

        cardIds.forEach(id => {
          const el = document.getElementById(id);
          if (el && window.getComputedStyle(el).opacity !== '0') {
            const r = el.getBoundingClientRect();
            const gap = capRect.top - r.bottom;
            overlaps.push({ id, gap: Math.round(gap), isOverlapping: gap < 0, bottom: Math.round(r.bottom), capTop: Math.round(capRect.top) });
          }
        });

        return { scene: ${sc}, overlaps };
      })()
    `);

    console.log(`Scene ${sc} checks:`, JSON.stringify(checkOverlap));
  }

  chromeProc.kill();
  console.log('\nLayout verification complete!');
}

main().catch(err => {
  console.error('Error during scene 6 layout check:', err);
  process.exit(1);
});
