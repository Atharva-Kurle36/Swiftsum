import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--window-size=1280,1000',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_s6_clean',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9232/json/version');
      wsUrl = (await res.json()).webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  };
  await new Promise(r => ws.onopen = r);
  const send = (method, params = {}) => new Promise(r => {
    const mid = id++;
    pending.set(mid, r);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/calculator?op=subtraction&a=1000&b=347' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const sendS = (method, params = {}) => new Promise(r => {
    const mid = id++;
    pending.set(mid, r);
    ws.send(JSON.stringify({ sessionId, id: mid, method, params }));
  });

  await sendS('Runtime.enable');
  await sendS('Page.enable');
  await new Promise(r => setTimeout(r, 3500));

  // Find the exact button for chapter 6 and click it via native CDP mouse click at its coordinates
  const btnCoords = await sendS('Runtime.evaluate', {
    expression: `(() => {
      const btn6 = Array.from(document.querySelectorAll('div.grid-cols-7 button'))[5];
      if (!btn6) return null;
      btn6.scrollIntoView({ block: 'center' });
      const r = btn6.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), title: btn6.innerText };
    })()`,
    returnByValue: true
  });
  console.log('Button 6 coordinates:', btnCoords.result?.value);

  if (btnCoords.result?.value) {
    const { x, y } = btnCoords.result.value;
    await sendS('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await sendS('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  }

  await new Promise(r => setTimeout(r, 2000));

  const afterState = await sendS('Runtime.evaluate', {
    expression: `(() => {
      const sceneBadge = document.querySelector('span.px-3.py-1.rounded-full.border')?.innerText;
      const captionTitle = document.querySelector('#captionPanel span')?.innerText;
      const card = document.querySelector('#fusedCard');
      const caption = document.querySelector('#captionPanel');
      let layout = null;
      if (card && caption) {
        const cr = card.getBoundingClientRect();
        const capr = caption.getBoundingClientRect();
        layout = {
          cardTop: Math.round(cr.top),
          cardBottom: Math.round(cr.bottom),
          cardHeight: Math.round(cr.height),
          cardText: card.innerText,
          captionTop: Math.round(capr.top),
          captionBottom: Math.round(capr.bottom),
          gap: Math.round(capr.top - cr.bottom)
        };
      }
      return { sceneBadge, captionTitle, hasCard: !!card, layout };
    })()`,
    returnByValue: true
  });
  console.log('State after native mouse click:', JSON.stringify(afterState.result?.value, null, 2));

  // Take screenshot
  const { data } = await sendS('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scene_6_verified_clean.png', Buffer.from(data, 'base64'));
  console.log('Saved screenshot to scene_6_verified_clean.png');

  chromeProc.kill();
}

main().catch(console.error);
