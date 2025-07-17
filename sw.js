self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("idle-rpg").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/manifest.json",
        "/sw.js",
        "/js/game.js",
        "/js/save.js",
        "/js/ui.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
