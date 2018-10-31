import omit from 'lodash/omit';
import { ADD_STUDENT, DELETE_STUDENT } from '../actions';

export default function studentList(state = {}, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_STUDENT:
      return omit(state, [action.payload]);
    default:
      return state;
  }
}
