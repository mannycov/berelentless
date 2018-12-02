const express = require('express');
const router = express.Router();

// Item Model
const Goal = require('../../models/goal');

// @route GET api/goals
// @desc Get all Goals
// @access Public
router.get('/', (req, res) => {
  Goal.find()
    .sort({ date: -1 })
    .then(goals => res.json(goals))
});

module.exports = router;