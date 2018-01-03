const Koa = require('koa');
const router = require('koa-router')();
const request = require('request-promise');
const cors = require('koa-cors');
const app = new Koa();

app.use(cors());

const baseURL = 'https://api.iextrading.com/1.0/stock'

// Route to handle GET request
router.get('/stock/:symbol/:range', async (ctx, next) => {
  const symbol = ctx.params.symbol;
  const range = ctx.params.range;
  const url = `${baseURL}/${symbol}/chart/${range}`;

  try {
    var data = await request(url);
    data = JSON.parse(data);
    ctx.body = data;
    await next();
  } catch(e) {
    console.error(e);
  }
});

router.get('/quote/:symbol', async(ctx, next) => {
  const symbol = ctx.params.symbol;
  const url = `${baseURL}/${symbol}/quote?displayPercent=true`;

  try {
    var data = await request(url);
    data = JSON.parse(data);
    ctx.body = data;
    await next();
  } catch(e) {
    console.error(e);
  }
});

app.use(router.routes());

module.exports = app;
