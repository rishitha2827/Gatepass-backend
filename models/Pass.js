const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  rollno: String,
  branch: String,
  year: String,
  date: String,
  time: String,
  reason: String,
  issued_by: String,
  left: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Pass', passSchema);
