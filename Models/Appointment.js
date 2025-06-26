const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  time: Date,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
