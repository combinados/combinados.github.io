((window) => {
  console.log("window;", window);
  console.log("self;", self);
  self.addEventListener("activate", (e) => {
    self.registration.unregister()
      .then(() => {
        return self.clients.matchAll();
      })
      .then((clients) => {
        clients.forEach(client => client.navigate(client.url));
      });
  });
})(window || { teste: testado });