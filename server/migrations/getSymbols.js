const request = require('request-promise');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stocks');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('WE ARE CONNECTED');
});

const stockSchema = mongoose.Schema({
    symbol: String,
    name: String,
    date: String,
    isEnabled: Boolean,
    type: String,
    iexId: String
});

stockSchema.statics.bulkInsert = function(models, fn) {
  if (!models || !models.length)
    return fn(null);

  var bulk = this.collection.initializeOrderedBulkOp();
  if (!bulk)
    return fn('bulkInsertModels: MongoDb connection is not yet established');

  var model;
  for (var i=0; i<models.length; i++) {
    model = models[i];
    bulk.insert(JSON.parse(model));
  }

  bulk.execute(fn);
};

const Stock = mongoose.model('symbols', stockSchema);

async function storeSymbols() {
    var data = await request('https://ws-api.iextrading.com/1.0/ref-data/symbols');
    data = JSON.parse(data);
    console.log(data);

    try {
        await Stock.insertMany(data);
        console.log('Done!');
        process.exit();
      } catch(e) {
        console.log(e);
        process.exit();
      }
}



if(require.main===module) {
    storeSymbols();
}