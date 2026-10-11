import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9234',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--window-size=1280,1000',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9234/json/version');
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

  // Scroll window to button and click
  const clickRes = await sendS('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('div.grid-cols-7 button'));
      const btn6 = btns[5];
      if (!btn6) return 'No btn6 found';
      btn6.scrollIntoView({ behavior: 'instant', block: 'center' });
      btn6.click();
      return 'Clicked: ' + btn6.innerText;
    })()`,
    returnByValue: true
  });
  console.log('clickRes:', clickRes.result?.value);

  await new Promise(r => setTimeout(r, 1500));

  const state = await sendS('Runtime.evaluate', {
    expression: `(() => {
      const badge = Array.from(document.querySelectorAll('span')).find(s => s.innerText.startsWith('Scene '));
      const card = document.querySelector('#fusedCard');
      const cap = document.querySelector('#captionPanel');
      let layout = null;
      if (card && cap) {
        const cr = card.getBoundingClientRect();
        const capr = cap.getBoundingClientRect();
        layout = {
          cardTop: Math.round(cr.top),
          cardBottom: Math.round(cr.bottom),
          cardHeight: Math.round(cr.height),
          cardText: card.innerText,
          capTop: Math.round(capr.top),
          capBottom: Math.round(capr.bottom),
          capText: cap.innerText,
          gap: Math.round(capr.top - cr.bottom)
        };
      }
      return {
        badge: badge ? badge.innerText : null,
        hasCard: !!card,
        hasCap: !!cap,
        layout
      };
    })()`,
    returnByValue: true
  });

  console.log('Scene 6 state:', JSON.stringify(state.result?.value, null, 2));

  // Save screenshot
  const { data } = await sendS('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scene6_final_proof.png', Buffer.from(data, 'base64'));
  console.log('Saved screenshot to scene6_final_proof.png');

  chromeProc.kill();
}

main().catch(console.error);
