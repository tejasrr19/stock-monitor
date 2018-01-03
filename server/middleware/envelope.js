module.exports = async (ctx, next) => {
  console.log('IN ENVELOPE');
  ctx.env = {
    requestId: ctx.id,
    requestUrl: ctx.request.url
  };
  await next();
  console.log(ctx.request.header.accept);
  if(ctx.request.header.accept === 'application/json') {
      ctx.body = {
        envelope: ctx.env,
        data: ctx.body
      };
    }
};
