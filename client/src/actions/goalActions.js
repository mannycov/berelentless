import { GET_GOALS, ADD_GOAL, DELETE_GOAL } from './types';

export const getGoals = () => {
  return {
    type: GET_GOALS
  };
};

export const deleteGoal = id => {
  return {
    type: DELETE_GOAL,
    payload: id
  };
};

export const addGoal = goal => {
  return {
    type: ADD_GOAL,
    payload: goal
  };
};
