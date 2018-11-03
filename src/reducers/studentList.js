import omit from 'lodash/omit';
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  DELETE_ALL_STUDENTS,
  CHANGE_STUDENT_NAME,
  CHANGE_STUDENT_INST,
} from '../actions';

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
    case CHANGE_STUDENT_NAME:
      return {
        ...omit(state, [action.payload.ID]),
        [action.payload.ID]: {
          ...omit(state[action.payload.ID], ['name']),
          name: action.payload.name,
        },
      };
    case CHANGE_STUDENT_INST:
      return {
        ...omit(state, [action.payload.ID]),
        [action.payload.ID]: {
          ...omit(state[action.payload.ID], ['instrument']),
          instrument: action.payload.instrument,
        },
      };
    default:
      return state;
  }
}
