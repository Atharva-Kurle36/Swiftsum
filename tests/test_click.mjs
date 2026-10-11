import { spawn } from 'node:child_process';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--window-size=1280,1000',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_click',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9227/json/version');
      wsUrl = (await res.json()).webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result);
    }
  };
  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    const msgId = id++;
    return new Promise(resolve => {
      pending.set(msgId, { resolve });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/calculator?op=subtraction&a=1000&b=347' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    const msgId = id++;
    return new Promise(resolve => {
      pending.set(msgId, { resolve });
      ws.send(JSON.stringify({ sessionId, id: msgId, method, params }));
    });
  }

  await sendSession('Runtime.enable');
  await sendSession('Page.enable');
  await new Promise(r => setTimeout(r, 4000));

  // Click Watch 3D Explanation
  await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const wb = btns.find(b => b.textContent && b.textContent.includes('WATCH 3D EXPLANATION'));
      if (wb) wb.click();
    })()`,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 1500));

  const before = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Scene '));
      return el ? el.innerText : 'none';
    })()`,
    returnByValue: true
  });
  console.log('Before click scene badge:', before.result?.value);

  // Click Chapter 6 button by title
  const nextRes = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const btn6 = document.querySelector('button[title*="6. Final"]');
      if (!btn6) return 'Button 6 with title not found. Available: ' + Array.from(document.querySelectorAll('div.grid-cols-7 button')).map(b => b.title).join(' | ');
      btn6.click();
      return 'Clicked: ' + btn6.title;
    })()`,
    returnByValue: true
  });
  console.log('Button 6 click result:', nextRes.result?.value);

  await new Promise(r => setTimeout(r, 1500));

  const scenesDump = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const all = Array.from(document.querySelectorAll('*')).filter(el => el.children.length === 0 && (el.innerText || '').includes('Scene'));
      return all.map(el => ({ tag: el.tagName, text: el.innerText, class: el.className }));
    })()`,
    returnByValue: true
  });
  console.log('Scenes dump:', JSON.stringify(scenesDump.result?.value, null, 2));

  const cardInfo = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelector('#fusedCard');
      const caption = document.querySelector('#captionPanel');
      if (!card || !caption) return { card: !!card, caption: !!caption };
      const cr = card.getBoundingClientRect();
      const capr = caption.getBoundingClientRect();
      return {
        cardText: card.innerText,
        cardTop: Math.round(cr.top),
        cardBottom: Math.round(cr.bottom),
        cardHeight: Math.round(cr.height),
        captionTop: Math.round(capr.top),
        gap: Math.round(capr.top - cr.bottom)
      };
    })()`,
    returnByValue: true
  });
  console.log('Card info:', JSON.stringify(cardInfo.result?.value, null, 2));

  chromeProc.kill();
}

main().catch(console.error);
