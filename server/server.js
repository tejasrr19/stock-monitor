const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const mongoose = require('mongoose');

const authMiddleware = require('./middleware/auth.js');

mongoose.connect('mongodb://localhost/stocks');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('WE ARE CONNECTED');
});

// create an instance of the Koa object
const app = new Koa();

app.keys = ['stockmon03051984'];
app.use(session(app));
app.use(cors({
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser());

app.use(mount(require('./router/auth.js')));

app.use(authMiddleware);

// mount the route
app.use(mount(require('./router/stock.js')));
app.use(mount(require('./router/symbols.js')));

if(require.main === module) {
     app.listen(3001); // default
}
