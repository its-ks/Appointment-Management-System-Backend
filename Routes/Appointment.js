const express = require('express');
const Appointment = require('../Models/Appointment');
const Professor = require('../Models/Professor');
const auth = require('../Middleware/auth');

const router = express.Router();

// Booking appointment for student
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  const { professorId, time } = req.body;
  const timeObj = new Date(time);

  try {
    const professor = await Professor.findById(professorId);
    const isAvailable = professor.availability.some(
      (slot) => new Date(slot).getTime() === timeObj.getTime()
    );

    if (!isAvailable) return res.status(400).json({ error: 'Time slot not available' });

    const exists = await Appointment.findOne({ professor: professorId, time: timeObj });
    if (exists) return res.status(400).json({ error: 'Time slot already booked' });

    const appointment = new Appointment({
      professor: professorId,
      student: req.user.id,
      time: timeObj,
    });
    await appointment.save();

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch {
    res.status(400).json({ error: 'Failed to book appointment' });
  }
});

// Cancel appointment by professor
router.delete('/:id', auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    if (req.user.role !== 'professor' || appt.professor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await appt.deleteOne();
    res.status(204).end();
  } catch {
    res.status(400).json({ error: 'Failed to cancel appointment' });
  }
});

// Student views their appointments
router.get('/my', auth, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  try {
    const appointments = await Appointment.find({ student: req.user.id })
      .populate('professor', 'name email');
    res.json(appointments);
  } catch {
    res.status(400).json({ error: 'Could not fetch appointments' });
  }
});

module.exports = router;
