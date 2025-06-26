const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://tbxd6342:hjxoM1gjk3cEDM7N@ams.vpxptwb.mongodb.net/";

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
