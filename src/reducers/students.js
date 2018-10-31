// import { ADD_STUDENT, DELETE_STUDENT, MODIFY_STUDENT } from './actions';

export default function students(state = {}, action) {
  switch (action.type) {
    // case ADD_STUDENT:
    //   return {
    //     ...action.payload,
    //   };
    // case DELETE_STUDENT:
    //   return omit(state, [action.payload]);
    // case MODIFY_STUDENT:
    //   return {
    //   ...omit(state, [action.payload.id]),
    //   ...action.payload,
    // };
    default:
      return state;
  }
}
