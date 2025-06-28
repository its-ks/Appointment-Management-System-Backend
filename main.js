const express = require('express');
require('dotenv').config();
require('./DATABASE/mongo');
const studentAuthRoutes = require('./Routes/AuthStudent');
const professorAuthRoutes = require('./Routes/AuthProfessor');
const availabilityRoutes = require('./Routes/Availability');
const appointmentRoutes = require('./Routes/Appointment');


const app = express();




app.use(express.json());

console.log('STUDENT', studentAuthRoutes);
console.log('PROFESSOR', professorAuthRoutes);
console.log('AVAILABILITY', availabilityRoutes);
console.log('APPOINTMENTS', appointmentRoutes);


app.use('/auth/student', studentAuthRoutes);
app.use('/auth/professor', professorAuthRoutes);
app.use('/availability', availabilityRoutes);
app.use('/appointment', appointmentRoutes);


const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000`);
  });
}

module.exports = app;
