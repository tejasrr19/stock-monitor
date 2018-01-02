var auth = function*(next) {
  if(this.isAuthenticated()) {
    console.log('PASSPORT USER ---->', this.passport.user);
    this.user = this.passport.user;
    yield next;
  } else {
    this.throw(408);
  }
};

module.exports = auth;
