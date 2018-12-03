import axios from 'axios';
import { GET_GOALS, ADD_GOAL, DELETE_GOAL, GOALS_LOADING } from './types';

export const getGoals = () => dispatch => {
  dispatch(setGoalsLoading());
  axios
    .get('/api/goals')
    .then(res => 
      dispatch({
        type: GET_GOALS,
        payload: res.data
      }))
};

export const addGoal = goal => dispatch => {
  axios
    .post('/api/goals', goal)
    .then(res => 
      dispatch({
        type: ADD_GOAL,
        payload: res.data
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
    );
};

export const setGoalsLoading = () => {
  return {
    type: GOALS_LOADING
  };
};