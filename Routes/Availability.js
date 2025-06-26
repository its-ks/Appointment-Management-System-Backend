const express = require('express');
const Professor = require('../Models/Professor');
const auth = require('../Middleware/auth');

const router = express.Router();

//Set availability
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'professor') return res.status(403).json({ error: 'Access denied' });

  try {
    const professor = await Professor.findById(req.user.id);

    professor.availability = req.body.timeSlots;

    await professor.save();
    res.json({ 
        message: 'Availability updated', 
        availability: professor.availability });
  } catch {
    res.status(400).json({ error: 'Could not update availability' });
  }
});

//View availability
router.get('/:professorId', auth, async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.professorId);

    if (!professor) return res.status(404).json({ error: 'Professor not found' });

    res.json(professor.availability || []);

  } catch {
    res.status(400).json({ error: 'Could not retrieve availability' });
  }
})

module.exports = router;
