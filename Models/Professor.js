const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  availability: [Date],
});

module.exports = mongoose.model('Professor', professorSchema);
