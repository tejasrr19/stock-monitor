const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  symbols: Array,
  active: Boolean
});

module.exports = mongoose.model('users', userSchema);
