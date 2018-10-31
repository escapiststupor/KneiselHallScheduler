import { ADD_STUDENT, DELETE_STUDENT } from '../actions';

export default function studentIDs(state = [], action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload.id];
    case DELETE_STUDENT:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
}
