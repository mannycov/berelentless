const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Goal Schema
const GoalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
