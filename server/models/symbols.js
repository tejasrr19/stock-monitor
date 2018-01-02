const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    symbol: String,
    name: String,
    date: String,
    isEnabled: Boolean,
    type: String,
    iexId: String
});

module.exports = mongoose.model('symbols', stockSchema);