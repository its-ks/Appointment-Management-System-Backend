const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://kaushlend:EVE8l26TX8XkPsYx@cluster0.wi7hsrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;
