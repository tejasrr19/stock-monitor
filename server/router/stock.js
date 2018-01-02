const Koa = require('koa');
const router = require('koa-router')();
const request = require('request-promise');
const cors = require('koa-cors');
const app = new Koa();

app.use(cors());

// Route to handle GET request
router.get('/stock-history/:symbol/:range', async (ctx, next) => {
  const symbol = ctx.params.symbol;
  const range = ctx.params.range;
  const baseURL = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`;
  var data = await request(baseURL);
  data = JSON.parse(data);

  ctx.body = data;
  await next();
});

app.use(router.routes());

module.exports = app;
