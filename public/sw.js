// 最小限のService Worker
// PWAの「インストール可能」条件を満たすために必要ですが、
// オフライン対応は現時点では行いません。

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // フェッチイベントのハンドラが必要な場合がありますが、
  // デフォルトの動作（ネットワーク経由）で問題ありません。
});
