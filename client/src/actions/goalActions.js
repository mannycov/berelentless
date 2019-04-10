import axios from 'axios';
import {
  GET_GOALS,
  GET_GOAL,
  ADD_GOAL,
  DELETE_GOAL,
  GOALS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

// Get Goals
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
        type: GET_GOALS,
        payload: null
      })
    ); 
};

// Get Goal
export const getGoal = (id) => dispatch => {
  dispatch(setGoalsLoading());
  axios
    .get(`/api/goals/${id}`)
    .then(res => 
      dispatch({
        type: GET_GOAL,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_GOAL,
        payload: null
      })
    ); 
};

// Add Goal
export const addGoal = goal => dispatch => {
  dispatch(clearErrors());
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

// Add Comment
export const addComment = (goalId, comment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/goals/comment/${goalId}`, comment)
    .then(res => 
      dispatch({
        type: GET_GOAL,
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

// Delete Comment
export const deleteComment = (goalId, commentId) => dispatch => {
  axios
    .delete(`/api/goals/comment/${goalId}/${commentId}`)
    .then(res => 
      dispatch({
        type: GET_GOAL,
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

// Delete Goal
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

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/goals/like/${id}`)
    .then(res => dispatch(getGoals()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/goals/unlike/${id}`)
    .then(res => dispatch(getGoals()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Loading State
export const setGoalsLoading = () => {
  return {
    type: GOALS_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
