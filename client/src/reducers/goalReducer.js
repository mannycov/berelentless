import uuid from 'uuid';
import { GET_GOALS, ADD_GOAL, DELETE_GOAL } from '../actions/types';

const initialState = {
  goals: [
    { id: uuid(), name: 'Lose 10lbs.' },
    { id: uuid(), name: 'Increase bench press 10lbs.' },
    { id: uuid(), name: 'Run 2 miles daily' },
    { id: uuid(), name: '55 pull-ups' }
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_GOALS:
      return {
        ...state
      };
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.payload)
      }
    case ADD_GOAL:
      return {
        ...state,
        goals: [action.payload, ...state.goals]
      }
    default:
      return state;
  }
}