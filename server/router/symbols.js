const Koa = require('koa');
const router = require('koa-router')();
const Symbol = require('../models/symbols.js');

const app = new Koa();

router.get('/symbols', async (ctx, next) => {
  console.log('GETTING SYMBOLS');
  ctx.body = await Symbol.find();
  await next();
});

app.use(router.routes());

module.exports = app;
