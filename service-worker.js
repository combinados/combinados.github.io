(() => {
  console.log("self;", self);
  self.registration.unregister()
    .then((ok = {}) => {
      console.log("ok;", ok);
    })
    .catch((naoOk = {}) => {
      console.log("naoOk;", naoOk);
    });
})();