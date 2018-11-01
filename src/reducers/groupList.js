import omit from 'lodash/omit';

import { CREATE_GROUP, DELETE_GROUP } from '../actions';
// from UI

import { SET_REHEARSAL_TIME, SET_COACHING_TIME } from '../actions';
// set automatically

export default function groupList(state = {}, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_GROUP:
      return omit(state, [action.payload]);
    default:
      return state;
  }
}
