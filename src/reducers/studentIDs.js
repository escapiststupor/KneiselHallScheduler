import { ADD_STUDENT, DELETE_STUDENT, DELETE_ALL_STUDENTS } from '../actions';

export default function studentIDs(state = [], action) {
  switch (action.type) {
    case ADD_STUDENT:
      return [...state, action.payload.id];
    case DELETE_STUDENT:
      return state.filter(id => id !== action.payload);
    case DELETE_ALL_STUDENTS:
      return [];
    default:
      return state;
  }
}
