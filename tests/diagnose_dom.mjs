import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--window-size=1280,1000',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_diag',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9227/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
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
  await new Promise(r => setTimeout(r, 3000));

  async function evalExpr(expression) {
    const res = await sendSession('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result?.value;
  }

  const initialStatus = await evalExpr(`
    (() => {
      const sceneBadge = document.querySelector('span.rounded-full.border');
      const captionTitle = document.querySelector('#captionPanel span');
      const allCards = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
      return {
        sceneBadge: sceneBadge ? sceneBadge.innerText : 'null',
        captionTitle: captionTitle ? captionTitle.innerText : 'null',
        allCardIds: allCards.filter(id => ['cardA','cardB','basePillarCard','lhsCard','rhsCard','combLhsCard','combRhsCard','fusedCard','vrRing'].includes(id))
      };
    })()
  `);
  console.log('Initial Status:', JSON.stringify(initialStatus, null, 2));

  // Now click button 5
  const clickOutcome = await evalExpr(`
    (() => {
      const btns = Array.from(document.querySelectorAll('div.grid-cols-7 button'));
      if (btns[5]) {
        btns[5].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        return { clickedText: btns[5].innerText };
      }
      return { error: 'No button 5' };
    })()
  `);
  console.log('Click Outcome:', JSON.stringify(clickOutcome));

  await new Promise(r => setTimeout(r, 2000));

  const afterClickStatus = await evalExpr(`
    (() => {
      const sceneBadge = document.querySelector('span.rounded-full.border');
      const captionTitle = document.querySelector('#captionPanel span');
      const captionText = document.querySelector('#captionPanel p');
      const fusedCard = document.querySelector('#fusedCard');
      return {
        sceneBadge: sceneBadge ? sceneBadge.innerText : 'null',
        captionTitle: captionTitle ? captionTitle.innerText : 'null',
        captionText: captionText ? captionText.innerText : 'null',
        hasFusedCard: !!fusedCard,
        fusedCardRect: fusedCard ? fusedCard.getBoundingClientRect() : null,
        captionRect: document.querySelector('#captionPanel')?.getBoundingClientRect()
      };
    })()
  `);
  console.log('After Click Status:', JSON.stringify(afterClickStatus, null, 2));

  chromeProc.kill();
}

main().catch(console.error);
