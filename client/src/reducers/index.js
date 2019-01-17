import { combineReducers } from 'redux';
import authReducer from './authReducer';
import goalReducer from './goalReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  goal: goalReducer,
  errors: errorReducer
});