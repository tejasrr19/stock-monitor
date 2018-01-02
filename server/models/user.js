const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  symbols: Array,
  active: Boolean
});

userSchema.methods.comparePassword = async (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
