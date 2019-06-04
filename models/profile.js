const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  photoName: {
    type: String
  },
  photoLocation: {
    type: String
  },
  location: {
    type: String
  },
  interests: {
    type: [String]
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
