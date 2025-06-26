const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');

const router = express.Router();


// Register - Student
router.post('/sregister', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const student = new Student(
      { name, 
        email, 
        password: hashed 
      });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Student registration failed'});
  }
});


// Login - Student
router.post('/slogin', async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student || !(await bcrypt.compare(password, student.password))) {
    return res.status(401).json({ error: 'Invalid User' });
  }
  const token = jwt.sign(
    { id: student._id, 
      role: 'student' }, process.env.JWT_SECRET);

  res.json({ token });
});


module.exports = router;