import { spawn } from 'node:child_process';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--window-size=1280,1000',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\Swarup\\.gemini\\antigravity-ide\\brain\\6993fdd4-df5f-46c5-b015-2cf4542e80a4\\scratch\\chrome_profile_audit',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch('http://127.0.0.1:9225/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
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
    if (msg.method === 'Console.messageAdded') {
      console.log('CONSOLE MSG:', msg.params?.message?.text);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const args = (msg.params?.args || []).map(a => a.value || a.description).join(' ');
      console.log(`CONSOLE [${msg.params?.type}]:`, args);
    }
    if (msg.method === 'Audits.issueAdded') {
      console.log('AUDITS ISSUE:', JSON.stringify(msg.params));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.log('EXCEPTION:', JSON.stringify(msg.params?.exceptionDetails));
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

  await sendSession('Console.enable');
  await sendSession('Runtime.enable');
  await sendSession('Audits.enable');
  await sendSession('Log.enable');
  await sendSession('Page.enable');

  await new Promise(r => setTimeout(r, 4500));

  const portalContent = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const portal = document.querySelector('nextjs-portal');
      if (!portal) return 'no nextjs-portal';
      const root = portal.shadowRoot;
      if (!root) return 'no shadowRoot';
      return {
        text: root.textContent || '',
        elements: Array.from(root.querySelectorAll('*')).map(el => ({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          text: (el.innerText || el.textContent || '').trim().substring(0, 80)
        })).filter(x => x.text.length > 0)
      };
    })()`,
    returnByValue: true
  });
  console.log('Portal parsed:', JSON.stringify(portalContent.result?.value, null, 2));

  const nextToast = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('[data-nextjs-toast]');
      return el ? el.innerText : 'no toast';
    })()`,
    returnByValue: true
  });
  console.log('Next toast:', nextToast.result?.value);

  const errorOverlay = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const allText = document.body.innerText;
      const issues = Array.from(document.querySelectorAll('*')).filter(el => (el.innerText || '').includes('1 Issue') || (el.innerText || '').includes('Issue'));
      return issues.map(el => ({ tag: el.tagName, text: el.innerText.substring(0, 100), className: el.className }));
    })()`,
    returnByValue: true
  });
  console.log('Elements with "Issue":', JSON.stringify(errorOverlay.result?.value, null, 2));

  chromeProc.kill();
}

main().catch(console.error);
