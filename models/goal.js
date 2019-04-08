const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Goal Schema
const GoalSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
    // required: true
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
    type: Date
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Goal = mongoose.model('goal', GoalSchema);
