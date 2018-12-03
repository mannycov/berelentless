import { GET_GOALS, ADD_GOAL, DELETE_GOAL } from './types';

export const getGoals = () => {
  return {
    type: GET_GOALS
  };
};