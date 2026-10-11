import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4';

async function main() {
  console.log('Launching headless Chrome for Subtraction verification...');
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1280,1000',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_sub',
    'about:blank'
  ]);

  chromeProc.on('error', (err) => console.error('Chrome spawn error:', err));

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9223/json/version');
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

  // Create target directly with subtraction 1000 - 347 URL
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

  console.log('Waiting for calculator page to load...');
  await new Promise(r => setTimeout(r, 3500));

  async function evalExpr(expression) {
    const res = await sendSession('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result?.value;
  }

  // Click Watch 3D Explanation if not open
  console.log('Checking for Watch 3D Explanation button...');
  const clickedWalkthrough = await evalExpr(`
    (() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const watchBtn = btns.find(b => b.textContent && b.textContent.includes('WATCH 3D EXPLANATION'));
      if (watchBtn) {
        watchBtn.click();
        return true;
      }
      return false;
    })()
  `);
  console.log('Clicked Watch 3D Explanation:', clickedWalkthrough);
  await new Promise(r => setTimeout(r, 2000));

  // Inspect Player Title
  const titleInfo = await evalExpr(`
    (() => {
      const h3 = document.querySelector('h3');
      const allText = document.body.innerText;
      return {
        h3: h3 ? h3.innerText : '',
        hasMultiplicationTitle: allText.includes('Multiplication Using the Nikhilam Method'),
        hasFactor1: allText.includes('Factor 1'),
        hasFactor2: allText.includes('Factor 2'),
        has347000: allText.includes('347000'),
        hasLeftPart: allText.includes('LEFT PART'),
        hasRightPart: allText.includes('RIGHT PART')
      };
    })()
  `);
  console.log('Title & Text checks:', titleInfo);

  // Scroll 3D player into view
  await evalExpr(`
    (() => {
      const player = document.querySelector('section[aria-label="3D Educational Player"]') || document.querySelector('#nikhilam-walkthrough') || document.querySelector('.aspect-video');
      if (player) {
        player.scrollIntoView({ behavior: 'instant', block: 'center' });
      } else {
        window.scrollBy(0, 750);
      }
    })()
  `);
  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot of each scene
  for (let scene = 1; scene <= 7; scene++) {
    await evalExpr(`
      (() => {
        const chapterContainer = document.querySelector('div.grid-cols-7');
        if (chapterContainer) {
          const btns = chapterContainer.querySelectorAll('button');
          if (btns[${scene - 1}]) {
            btns[${scene - 1}].click();
          }
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 1200));

    const sceneData = await evalExpr(`
      (() => {
        const text = document.body.innerText;
        return {
          scene: ${scene},
          has653: text.includes('653'),
          has347: text.includes('347'),
          has1000: text.includes('1000'),
          hasVerification: text.includes('Arithmetic Verification Passed') || text.includes('653 + 347 = 1000')
        };
      })()
    `);
    console.log(`Scene ${scene} data:`, sceneData);

    const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, `subtraction_scene_${scene}.png`), Buffer.from(data, 'base64'));
    console.log(`Captured subtraction_scene_${scene}.png`);
  }

  // Switch to Multiplication
  console.log('\n--- Switching to Multiplication (98 x 97) ---');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/calculator?op=multiplication&a=98&b=97' });
  await new Promise(r => setTimeout(r, 3000));

  await evalExpr(`
    (() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const watchBtn = btns.find(b => b.textContent && b.textContent.includes('WATCH 3D EXPLANATION'));
      if (watchBtn) watchBtn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const mulCheck = await evalExpr(`
    (() => {
      const text = document.body.innerText;
      return {
        has9506: text.includes('9506'),
        hasMultiplicationTitle: text.includes('Multiplication Using the Nikhilam Method'),
        hasSubtractionTitle: text.includes('Subtraction Using the Nikhilam Method')
      };
    })()
  `);
  console.log('Multiplication check:', mulCheck);

  // Switch back to Subtraction
  console.log('\n--- Switching back to Subtraction (1000 - 347) ---');
  await sendSession('Page.navigate', { url: 'http://localhost:3000/calculator?op=subtraction&a=1000&b=347' });
  await new Promise(r => setTimeout(r, 3000));

  await evalExpr(`
    (() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const watchBtn = btns.find(b => b.textContent && b.textContent.includes('WATCH 3D EXPLANATION'));
      if (watchBtn) watchBtn.click();
    })()
  `);
  await new Promise(r => setTimeout(r, 2000));

  const subCheck = await evalExpr(`
    (() => {
      const text = document.body.innerText;
      return {
        has653: text.includes('653'),
        has347000: text.includes('347000'),
        hasMultiplicationTitle: text.includes('Multiplication Using the Nikhilam Method'),
        hasSubtractionTitle: text.includes('Subtraction Using the Nikhilam Method')
      };
    })()
  `);
  console.log('Subtraction return check:', subCheck);

  chromeProc.kill();
  console.log('\nVerification complete!');
}

main().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
