import omit from 'lodash/omit';
import { ADD_STUDENT, DELETE_STUDENT, DELETE_ALL_STUDENTS } from '../actions';

export default function studentList(state = {}, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_STUDENT:
      return omit(state, [action.payload.ID]);
    case DELETE_ALL_STUDENTS:
      return {};
    default:
      return state;
  }
}
