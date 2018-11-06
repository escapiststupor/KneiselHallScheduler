import omit from 'lodash/omit';
import {
  ADD_COACH,
  DELETE_COACH,
  DELETE_ALL_COACHES,
  CHANGE_COACH_NAME,
  CHANGE_COACHING_TIME,
} from '../actions';

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
    case CHANGE_COACH_NAME: {
      const { ID, name } = action.payload;
      return {
        ...omit(state, [ID]),
        [action.payload.ID]: {
          ...omit(state[ID], ['name']),
          name,
        },
      };
    }
    case CHANGE_COACHING_TIME: {
      const { ID, coachingDays } = action.payload;
      return {
        ...omit(state, [ID]),
        [action.payload.ID]: {
          ...omit(state[ID], ['coachingDays']),
          coachingDays,
        },
      };
    }
    default:
      return state;
  }
}
