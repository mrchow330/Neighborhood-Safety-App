const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Report Schema
const reportSchema = new mongoose.Schema({
  report_id: { type: String, required: true },
  issueType: String,
  location: String,
  description: String,
  photoUri: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Submitted" }, 
});

const Report = mongoose.model('Report', reportSchema, 'reports');

app.get('/', (req, res) => {
  res.send('Welcome to the Neighborhood Safety API!');
});

// API Route to Submit Reports
app.post('/api/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// Export for Vercel
module.exports = app;
