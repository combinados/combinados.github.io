// (({ navigator }) => {
//   navigator.serviceWorker.getRegistrations().then(function (registrations) {
//     for (let registration of registrations) {
//       registration.unregister()
//     }
//   })
// })(window);

self.addEventListener("activate", function (e) {

  self.registration.unregister()
    .then(function () {

      return self.clients.matchAll();

    })
    .then(function (clients) {

      clients.forEach(client => client.navigate(client.url));

    });

});