const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Professor = require('../Models/Professor');

const router = express.Router();

// Register - Professor
router.post('/pregister', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const professor = new Professor(
        { name, 
          email, 
          password: hashed 
        });

    await professor.save();
    res.status(201).json({ message: 'Professor registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Professor registration failed'});
  }
});

// Login - Professor
router.post('/plogin', async (req, res) => {
  const { email, password } = req.body;
  const professor = await Professor.findOne({ email });
  if (!professor || !(await bcrypt.compare(password, professor.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ 
    id: professor._id, 
    role: 'professor' }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router