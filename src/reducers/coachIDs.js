import { ADD_COACH, DELETE_COACH, DELETE_ALL_COACHES } from '../actions';

export default function coachIDs(state = [], action) {
  switch (action.type) {
    case ADD_COACH:
      return [...state, action.payload.id];
    case DELETE_COACH:
      return state.filter(id => id !== action.payload);
    case DELETE_ALL_COACHES:
      return [];
    default:
      return state;
  }
}
