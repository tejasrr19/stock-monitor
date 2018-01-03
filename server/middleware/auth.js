var auth = async (ctx, next) => {
  if(ctx.isAuthenticated()) {
    ctx.user = ctx.state.user;
    await next();
  } else {
    ctx.throw(408);
  }
};

module.exports = auth;
