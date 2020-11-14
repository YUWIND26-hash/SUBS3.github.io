importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js",
);
if (workbox) console.log("Workbox berhasil dimuat");
else console.log("Workbox gagal dimuat");

// Pengganti event install
workbox.precaching.precacheAndRoute(
  [  
    { url: '/', revision: '6' },
    { url: '/index.html', revision: '6' },
    { url: '/nav.html', revision: '6' },
    { url: '/article.html', revision: '6' },
    { url: '/pages/home.html', revision: '6' },
    { url: '/pages/competition.html', revision: '6' },
    { url: '/pages/team.html', revision: '6' },
    { url: '/pages/saved.html', revision: '6' },
    { url: '/css/materialize.min.css', revision: '6' },
    { url: '/css/style.css', revision: '6' },
    { url: '/manifest.json', revision: '6' },
    { url: '/js/nav.js', revision: '6' },
    { url: '/js/materialize.min.js', revision: '6' },
    { url: '/js/api.js', revision: '6' },
    { url: '/js/idb.js', revision: '6' },
    { url: '/js/db.js', revision: '6' },
    { url: '/js/sw.js', revision: '6' },
    { url: '/js/notif.js', revision: '6' },
    { url: '/assets/icon.png', revision: '6' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '6' },
  ],
  {
  ignoreUrlParametersMatching: [/.*/],
  },
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api-data",
  }),
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  }),
);


self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "assets/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  );
});