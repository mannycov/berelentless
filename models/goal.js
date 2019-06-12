const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Goal Schema
const GoalSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
    type: Date
  },
  to: {
    type: Date
  },
  complete: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    type: String
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
        ref: 'User'
      }
    }
  ],
  checkins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      weight: {
        type: String
      },
      reps: {
        type: String
      },
      minutes: {
        type: String
      },
      seconds: {
        type: String
      },
      checkin: {
        type: Boolean
      },
      note: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
        type: Date
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Goal = mongoose.model('Goal', GoalSchema);
