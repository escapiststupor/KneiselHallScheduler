import { CREATE_GROUP, DELETE_GROUP } from '../actions';
// from UI

import { SET_REHEARSAL_TIME, SET_GROUPING_TIME } from '../actions';
// set automatically

export default function groupIDs(state = [], action) {
  switch (action.type) {
    case CREATE_GROUP:
      return [...state, action.payload.id];
    case DELETE_GROUP:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
}
