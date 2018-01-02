const Koa = require('koa');
const router = require('koa-router')();
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const util = require('../lib/util.js');
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
  User.findOne({ email: email}).select({ password: 0 }).exec((error, user) => {
    if(error) {
      console.error(error);
    }
    if (!user) return done(null, false);
    if (user.comparePassword(password)) {
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

router.post('/user', async(ctx, next) => {
  var user = ctx.request.body;
  try {
    var hashedPassword = util.generateHash(user.password);
    user.password = hashedPassword;
    await User.create(user);
    ctx.body = 'User Created!';
  } catch(e) {
    console.error(e);
  }
});

app.use(router.routes());

module.exports = app;
