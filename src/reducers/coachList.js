import omit from 'lodash/omit';
import { ADD_COACH, DELETE_COACH } from '../actions';

export default function coachList(state = {}, action) {
  switch (action.type) {
    case ADD_COACH:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_COACH:
      return omit(state, [action.payload]);
    default:
      return state;
  }
}
