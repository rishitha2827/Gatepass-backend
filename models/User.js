// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['hod', 'watchman']
  }
});

module.exports = mongoose.model('User', userSchema);
