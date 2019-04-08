const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGoalInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = 'Title must be between 2 and 30 characetrs';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  // if (Validator.isEmpty(data.category)) {
  //   errors.category = 'Category field is required';
  // }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}