const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // ✅ ONLY ONCE

const app = express();

/* =======================
   MONGODB CONNECTION
   (HARDCODED – LOCAL ONLY)
======================= */

mongoose.connect(
  'mongodb+srv://supercluster.td99e5s.mongodb.net/superData',
  {
    user: 'pradipkakade7777_db_user',
    pass: 'Welcome@1234',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once('open', () => {
  console.log('✅ MongoDB Atlas connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

/* =======================
   EXPRESS MIDDLEWARE
======================= */

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

/* =======================
   MONGOOSE SCHEMA & MODEL
======================= */

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});

const planetModel = mongoose.model('planets', dataSchema);

/* =======================
   ROUTES
======================= */

app.post('/planet', function (req, res) {
  const planetId = Number(req.body.id);
  planetModel.findOne({ id: planetId }, function (err, planetData) {
    if (err || !planetData) {
      res.status(404).send("Planet not found");
    } else {
      res.send(planetData);
    }
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', function (req, res) {
  res.json({
    os: OS.hostname(),
    env: process.env.NODE_ENV
  });
});

app.get('/live', function (req, res) {
  res.json({ status: "live" });
});

app.get('/ready', function (req, res) {
  res.json({ status: "ready" });
});

/* =======================
   SERVER START
======================= */

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});

module.exports = app;
