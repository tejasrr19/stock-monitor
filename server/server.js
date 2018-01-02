const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa-cors');
const mount = require('koa-mount');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stocks');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('WE ARE CONNECTED');
});

// create an instance of the Koa object
const app = new Koa();

app.use(cors());

// mount the route
app.use(mount(require('./router/stock.js')));
app.use(mount(require('./router/symbols.js')));

if(require.main === module) {
     app.listen(3001); // default
}
