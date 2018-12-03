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
      }
    default:
      return state;
  }
}