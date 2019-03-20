import axios from 'axios';
import { GET_GOALS, GET_GOAL, ADD_GOAL, DELETE_GOAL, GOALS_LOADING, GOAL_LOADING, GET_ERRORS } from './types';

export const getGoals = () => dispatch => {
  dispatch(setGoalsLoading());
  axios
    .get('/api/goals')
    .then(res => 
      dispatch({
        type: GET_GOALS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

// Add Goal
export const addGoal = goal => dispatch => {
  axios
    .post('/api/goals', goal)
    .then(res => 
      dispatch({
        type: ADD_GOAL,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

export const deleteGoal = id => dispatch => {
  axios
    .delete(`/api/goals/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_GOAL,
        payload: id
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ); 
};

export const setGoalsLoading = () => {
  return {
    type: GOALS_LOADING
  };
};