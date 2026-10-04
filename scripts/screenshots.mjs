// Captures README screenshots of the deployed site at several device sizes.
//
//   node scripts/screenshots.mjs [baseUrl]
//
// Drives a local Chrome over the DevTools protocol (no extra npm packages) and emulates each viewport
// exactly, including widths below Chrome's ~500px minimum window size that `--window-size` can't reach.
// Set CHROME_PATH if Chrome isn't in the default location.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = (process.argv[2] || 'https://branbayou.github.io/dev-jobs').replace(/\/$/, '');
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'screenshots');
const PORT = 9333;

const CHROME_PATH =
  process.env.CHROME_PATH ||
  {
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    linux: '/usr/bin/google-chrome',
  }[process.platform];

const SHOTS = [
  { name: 'desktop', path: '/', width: 1920, height: 1080 },
  { name: 'laptop', path: '/', width: 1440, height: 900 },
  { name: 'tablet', path: '/', width: 768, height: 1024, mobile: true },
  { name: 'mobile', path: '/', width: 390, height: 844, mobile: true },
  { name: 'jobs-laptop', path: '/jobs', width: 1440, height: 900 },
  { name: 'job-details-laptop', path: '/jobs/1', width: 1440, height: 900 },
];

// Long enough for web fonts, images and the hero count-up animation (~2s) to finish.
const SETTLE_MS = 4000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDebugger() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const page = (await res.json()).find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await sleep(200);
  }
  throw new Error('Chrome did not start its DevTools endpoint.');
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();
    const listeners = new Map();
    ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      } else if (msg.method && listeners.has(msg.method)) {
        listeners.get(msg.method)(msg.params);
        listeners.delete(msg.method);
      }
    };
    ws.onerror = reject;
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            const id = nextId++;
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          }),
        once: (method) => new Promise((res) => listeners.set(method, res)),
        close: () => ws.close(),
      });
  });
}

const profileDir = mkdtempSync(join(tmpdir(), 'dev-jobs-shots-'));
const chrome = spawn(CHROME_PATH, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profileDir}`,
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank',
]);

try {
  const cdp = await connect(await waitForDebugger());
  await cdp.send('Page.enable');
  mkdirSync(OUT_DIR, { recursive: true });

  for (const shot of SHOTS) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: shot.width,
      height: shot.height,
      deviceScaleFactor: 1,
      mobile: !!shot.mobile,
    });
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: BASE_URL + shot.path });
    // Don't hang forever if one slow resource holds up the load event; the page is usable well before.
    await Promise.race([loaded, sleep(20000)]);
    await sleep(SETTLE_MS);

    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const file = join(OUT_DIR, `${shot.name}.png`);
    writeFileSync(file, Buffer.from(data, 'base64'));
    console.log(`✓ ${shot.name.padEnd(20)} ${shot.width}×${shot.height}  ${BASE_URL + shot.path}`);
  }
  cdp.close();
} finally {
  chrome.kill();
  await sleep(500);
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
