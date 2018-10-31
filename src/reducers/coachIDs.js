import { ADD_COACH, DELETE_COACH } from '../actions';

export default function coachIDs(state = [], action) {
  switch (action.type) {
    case ADD_COACH:
      return [...state, action.payload.id];
    case DELETE_COACH:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
}
