const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Goal Model
const Goal = require('../../models/goal');
// Profile Model
const Profile = require('../../models/profile');

// Validation
const validateGoalInput = require('../../validation/goal');
const validateCommentInput = require('../../validation/comment');

// @route   GET api/goals
// @desc    Get all Goals
// @access  Public
router.get('/', (req, res) => {
  Goal.find()
    .sort({ date: -1 })
    .then(goals => res.json(goals))
    .catch((err => res.status(404).json({ nogoalfound: 'No goals found' })));
});

// @route   GET api/goals/:id
// @desc    Get Goal by ID
// @access  Public
router.get('/:id', (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => res.json(goal))
    .catch((err => res.status(404).json({ nogoalfound: 'No goal found with that ID' })));
});

// @route   POST api/goals
// @desc    Create a Goal
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateGoalInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newGoal = new Goal({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    weightTarget: req.body.weightTarget,
    repTarget: req.body.repTarget,
    minutes: req.body.minutes,
    seconds: req.body.seconds,
    days: req.body.days,
    user: req.user.id,
    name: req.body.name,
    avatar: req.body.avatar
  });

  newGoal.save().then(goal => res.json(goal));
});

// @route   DELETE api/goals/:id
// @desc    Delete a Goal
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Goal.findById(req.params.id)
        .then(goal => {
          // Check for goal owner
          if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' });
          }

          // Delete
          goal.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ goalnotfound: 'No goal found' }));
    });
});


// @route   POST api/goals/like/:id
// @desc    Like a Goal
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Goal.findById(req.params.id)
        .then(goal => {
          if (goal.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this goal' });
          }

          // Add user id to likes array
          goal.likes.unshift({ user: req.user.id});

          goal.save().then(goal => res.json(goal));
        })
        .catch(err => res.status(404).json({ goalnotfound: 'No goal found to add like' }));
    });
});

// @route   POST api/goals/unlike/:id
// @desc    Unlike a Goal
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Goal.findById(req.params.id)
        .then(goal => {
          if (goal.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not liked this goal' });
          }

          // Get remove index
          const removeIndex = goal.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          goal.likes.splice(removeIndex, 1);

          // Save
          goal.save().then(goal => res.json(goal));
        })
        .catch(err => res.status(404).json({ goalnotfound: 'No goal found to add like' }));
    });
});

// @route POST api/goals/comment/:id
// @desc  Add comment to goal
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Goal.findById(req.params.id)
    .then(goal => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      // Add to comments array
      goal.comments.unshift(newComment);

      // Save
      goal.save().then(goal => res.json(goal));
    })
    .catch(err => res.statu(404).json({ goalnotfound: 'No goal found' }));
});

// @route DELETE api/goals/comment/:id/:comment_id
// @desc  Delete a comment from goal
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      // Check to see if comment exists
      if (goal.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist '})
      }

      // Get remove index
      const removeIndex = goal.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      goal.comments.splice(removeIndex, 1);

      // Svae
      goal.save().then(goal => res.json(goal));
    })
    .catch(err => res.status(404).json({ goalnotfound: 'No goal found' }));
});


module.exports = router;