// Service Worker
// - ページ: ネットワーク優先。つながらないときは前に見たページ、なければオフライン用ページを出す
// - /_astro/ の資産(ファイル名にハッシュ付き): キャッシュ優先
// - 画像などその他の同一オリジンの資産: キャッシュを先に返し、裏で更新する
// 中身を変えたら VERSION を上げる(古いキャッシュは activate で消える)

const VERSION = "v2";
const PAGES = `pages-${VERSION}`;
const ASSETS = `assets-${VERSION}`;
const OFFLINE_URL = "/offline/";
const OFFLINE_URL_EN = "/en/offline/";
// キャッシュが増え続けないよう、1つのキャッシュに残す件数の上限(古いものから消す)
const MAX_ENTRIES = 60;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll([OFFLINE_URL, OFFLINE_URL_EN]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PAGES && key !== ASSETS)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(event));
  } else if (url.pathname.startsWith("/_astro/")) {
    event.respondWith(cacheFirst(event));
  } else {
    event.respondWith(staleWhileRevalidate(event));
  }
});

// 書き込みはレスポンスを返したあとも続くので、waitUntil でワーカーが止まらないようにする
function store(event, cache, request, response) {
  event.waitUntil(
    cache
      .put(request, response)
      .then(() => cache.keys())
      .then((keys) =>
        Promise.all(
          keys
            .slice(0, Math.max(0, keys.length - MAX_ENTRIES))
            .filter(
              (key) =>
                !key.url.endsWith(OFFLINE_URL) &&
                !key.url.endsWith(OFFLINE_URL_EN),
            )
            .map((key) => cache.delete(key)),
        ),
      )
      .catch(() => {}),
  );
}

async function networkFirst(event) {
  const { request } = event;
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) store(event, cache, request, response.clone());
    return response;
  } catch {
    const isEnglish = new URL(request.url).pathname.startsWith("/en/");
    return (
      (await cache.match(request)) ??
      (await cache.match(isEnglish ? OFFLINE_URL_EN : OFFLINE_URL)) ??
      Response.error()
    );
  }
}

async function cacheFirst(event) {
  const { request } = event;
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) store(event, cache, request, response.clone());
  return response;
}

async function staleWhileRevalidate(event) {
  const { request } = event;
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request);
  const update = fetch(request)
    .then((response) => {
      if (response.ok) store(event, cache, request, response.clone());
      return response;
    })
    .catch(() => cached ?? Response.error());
  if (cached) {
    // 返したあとも更新を続けられるよう、ワーカーを止めない
    event.waitUntil(update);
    return cached;
  }
  return update;
}
