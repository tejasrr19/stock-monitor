const bcrypt = require('bcrypt-nodejs');

module.exports = {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
};
