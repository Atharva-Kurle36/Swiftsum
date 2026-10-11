import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_arrow',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9230/json/version');
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

  for (let i = 0; i < 5; i++) {
    await sendS('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    await sendS('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
    await new Promise(r => setTimeout(r, 400));
  }

  const badge = await sendS('Runtime.evaluate', {
    expression: 'document.querySelector("span.font-mono.text-xs.font-semibold")?.innerText',
    returnByValue: true
  });
  console.log('Badge after 5 ArrowRights:', badge.result?.value);

  const caption = await sendS('Runtime.evaluate', {
    expression: 'document.querySelector("#captionPanel")?.innerText',
    returnByValue: true
  });
  console.log('Caption after 5 ArrowRights:', caption.result?.value);

  const card = await sendS('Runtime.evaluate', {
    expression: 'document.querySelector("#fusedCard")?.innerText',
    returnByValue: true
  });
  console.log('FusedCard after 5 ArrowRights:', card.result?.value);

  const layout = await sendS('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelector("#fusedCard");
      const cap = document.querySelector("#captionPanel");
      if (!card || !cap) return null;
      const cr = card.getBoundingClientRect();
      const capr = cap.getBoundingClientRect();
      return {
        cardTop: Math.round(cr.top),
        cardBottom: Math.round(cr.bottom),
        cardHeight: Math.round(cr.height),
        capTop: Math.round(capr.top),
        capBottom: Math.round(capr.bottom),
        gap: Math.round(capr.top - cr.bottom)
      };
    })()`,
    returnByValue: true
  });
  console.log('Layout measurements:', JSON.stringify(layout.result?.value, null, 2));

  // Take screenshot
  const { data } = await sendS('Page.captureScreenshot', { format: 'png' });
  const fs = await import('node:fs');
  const path = await import('node:path');
  fs.writeFileSync('C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scene_6_verified_clean.png', Buffer.from(data, 'base64'));
  console.log('Saved scene_6_verified_clean.png');

  chromeProc.kill();
}

main().catch(console.error);
