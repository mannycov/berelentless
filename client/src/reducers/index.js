import { combineReducers } from 'redux';
import goalReducer from './goalReducer';

export default combineReducers({
  goal: goalReducer
});