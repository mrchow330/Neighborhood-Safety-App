const express = require('express');
const Report = require('../models/Report'); // Import Report model

const router = express.Router();

// POST /api/reports - Create a new report
router.post('/', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

module.exports = router;
