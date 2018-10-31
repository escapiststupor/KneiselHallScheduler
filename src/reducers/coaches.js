import { ADD_COACH, DELETE_COACH, MODIFY_COACH } from '../actions';

export default function groups(state = {}, action) {
  switch (action.type) {
    // case ADD_COACH:
    //   return {
    //     ...action.payload,
    //   };
    // case DELETE_COACH:
    //   return omit(state, [action.payload]);
    // case MODIFY_COACH:
    //   return {
    //   ...omit(state, [action.payload.id]),
    //   ...action.payload,
    // };
    default:
      return state;
  }
}
