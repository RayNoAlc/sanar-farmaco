const CACHE_NAME = 'sanar-farmaco-v2';
const BLACKOUT_START = 1793204700000; // 2026-10-28T13:25:00-03:00 (16:25:00 UTC)
const BLACKOUT_END   = 1793214000000; // 2026-10-28T16:00:00-03:00 (19:00:00 UTC)

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/medicine_bottle_3d.png',
  './assets/logo.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900;1000&family=JetBrains+Mono:wght@500;700&display=swap',
  'https://cdn.tailwindcss.com'
];

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sanar Farmaco • Manutenção do Sistema</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0b1120;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      max-width: 500px;
      width: 100%;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
    }
    .icon {
      width: 76px;
      height: 76px;
      margin: 0 auto 20px;
      background: rgba(239, 68, 68, 0.12);
      border: 2px solid #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34px;
    }
    .badge {
      display: inline-block;
      background: #dc2626;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 9999px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p.sub {
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .info-box {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 16px 20px;
      text-align: left;
      font-size: 13px;
      margin-bottom: 24px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #1e293b;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #64748b; font-weight: 500; }
    .info-val { color: #f1f5f9; font-weight: 700; }
    .countdown {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 18px;
      font-weight: 700;
      color: #38bdf8;
    }
    .note {
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🛑</div>
    <div class="badge">Serviço Temporariamente Indisponível</div>
    <h1>Sanar Farmaco Offline</h1>
    <p class="sub">A plataforma Sanar Farmaco está temporariamente desligada para manutenção de rotina e atualização dos servidores.</p>
    <div class="info-box">
      <div class="info-row">
        <span class="info-label">Status:</span>
        <span class="info-val" style="color:#ef4444;">● Fora do Ar (503)</span>
      </div>
      <div class="info-row">
        <span class="info-label">Início:</span>
        <span class="info-val">Quarta, 28/10 às 13:25</span>
      </div>
      <div class="info-row">
        <span class="info-label">Previsão de Retorno:</span>
        <span class="info-val" style="color:#22c55e;">Quarta, 28/10 às 16:00</span>
      </div>
      <div class="info-row">
        <span class="info-label">Tempo restante:</span>
        <span class="info-val countdown" id="blackout-timer">--:--:--</span>
      </div>
    </div>
    <p class="note">O sistema retornará automaticamente após as 16:00. Não é necessário atualizar a página.</p>
  </div>
  <script>
    const BLACKOUT_END = 1793214000000;
    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= BLACKOUT_END) {
        clearInterval(interval);
        window.location.reload(true);
        return;
      }
      const diff = Math.max(0, BLACKOUT_END - now);
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      const timerEl = document.getElementById('blackout-timer');
      if (timerEl) {
        timerEl.textContent = h + ':' + m + ':' + s;
      }
    }, 1000);
  </script>
</body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const now = Date.now();
  if (now >= BLACKOUT_START && now < BLACKOUT_END) {
    if (event.request.mode === 'navigate' || event.request.destination === 'document') {
      event.respondWith(
        new Response(MAINTENANCE_HTML, {
          status: 503,
          statusText: 'Service Unavailable',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
          }
        })
      );
      return;
    }
    event.respondWith(new Response('', { status: 503, statusText: 'Service Unavailable' }));
    return;
  }

  // Network-First for navigation requests (ensures freshest blackout and code updates)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache-First for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.method === 'GET'
        ) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
