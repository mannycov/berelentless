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

// @route POST api/goals
// @desc Create a Goal
// @access Public
router.post('/', (req, res) => {
  const newGoal = new Goal({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category
  });

  newGoal.save().then(goal => res.json(goal));
});

// @route DELETE api/goals/:id
// @desc Delete a Goal
// @access Public
router.delete('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => goal.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;