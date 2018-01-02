const Koa = require('koa');
const router = require('koa-router')();
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js');
const app = new Koa();

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user._id.toString()); });


passport.deserializeUser(async function(user, done) {
  User.findById(user._id).exec((error, user) => {
    if(error) {
      console.error(error);
    } else {
      done(null, user);
    }
  });
});

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
  User.findOne({ email: email}).exec((error, user) => {
    if(error) {
      console.error(error);
    }
    if (!user) return done(null, false);
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

// Router
router.post('/login', passport.authenticate('local', {}), async (ctx, next) => {
  ctx.body = ctx.state.user;
});

app.use(router.routes());

module.exports = app;
