import omit from 'lodash/omit';
import { ADD_COACH, DELETE_COACH, DELETE_ALL_COACHES } from '../actions';

export default function coachList(state = {}, action) {
  switch (action.type) {
    case ADD_COACH:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_COACH:
      return omit(state, [action.payload.ID]);
    case DELETE_ALL_COACHES:
      return {};
    default:
      return state;
  }
}
