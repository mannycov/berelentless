import { GET_GOALS, ADD_GOAL, DELETE_GOAL, GOALS_LOADING } from '../actions/types';

const initialState = {
  goals: [],
  goal: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOALS:
      return {
        ...state,
        goals: action.payload,
        loading: false
      };
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.payload)
      }
    case ADD_GOAL:
      return {
        ...state,
        goals: [action.payload, ...state.goals]
      }
    case GOALS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}