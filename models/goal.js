const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Goal Schema
const GoalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  weightTarget: {
    type: String
  },
  repTarget: {
    type: String
  },
  minutes: {
    type: String
  },
  seconds: {
    type: String
  },
  days: {
    type: String
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
