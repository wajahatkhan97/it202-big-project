


// self.addEventListener("install", (e) => {
//   console.log("installing", e);
// });


// self.addEventListener("fetch", (e) => {
//   console.log("fetch", e);
// });

var cacheName = 'app-v1';
const assets = [
 "./project4.html",
"https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css",
    "https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js",
"https://www.gstatic.com/charts/loader.js",

"./webmanifest",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
    " all.js",
        "https://npmcdn.com/dexie/dist/dexie.min.js",

];



self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+ e.request.url);
      
      return r || fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
        });
      });
    })
  );
});