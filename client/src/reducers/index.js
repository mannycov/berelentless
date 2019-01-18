import { combineReducers } from 'redux';
import authReducer from './authReducer';
import goalReducer from './goalReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  goal: goalReducer,
  errors: errorReducer,
  profile: profileReducer
});