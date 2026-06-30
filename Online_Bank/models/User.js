const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  address: { type: String, default: ''},
  phone: { type: String, default: ''}
});

module.exports = mongoose.model('User', userSchema);