import omit from 'lodash/omit';

import {
  CREATE_GROUP,
  DELETE_GROUP,
  DELETE_ALL_STUDENTS,
  DELETE_ALL_COACHES,
  DELETE_ALL_GROUPS,
  DELETE_COACH,
  DELETE_STUDENT,
  CHANGE_COACH,
  CHANGE_WORK,
  DELETE_STUDENT_FROM_GROUP,
  ADD_STUDENT_TO_GROUP,
} from '../actions';

export default function groupList(state = {}, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_GROUP:
      return omit(state, [action.payload]);
    case DELETE_ALL_STUDENTS:
    case DELETE_ALL_COACHES:
    case DELETE_ALL_GROUPS:
      return {};
    case DELETE_COACH: {
      const { ID: coachID } = action.payload;
      const groupID2Delete = [];
      Object.keys(state).forEach(groupID => {
        if (state[groupID].coach === coachID) groupID2Delete.push(groupID);
      });
      return omit(state, groupID2Delete);
    }
    case DELETE_STUDENT: {
      const { ID: studentID } = action.payload;
      const groupID2Delete = [];
      Object.keys(state).forEach(groupID => {
        if (state[groupID].members.includes(studentID))
          groupID2Delete.push(groupID);
      });
      return omit(state, groupID2Delete);
    }
    case CHANGE_COACH: {
      const { groupID, coachID } = action.payload;
      return {
        ...omit(state, [groupID]),
        [groupID]: {
          ...omit(state[groupID], ['coach']),
          coach: coachID,
        },
      };
    }
    case CHANGE_WORK: {
      const { groupID, work } = action.payload;
      return {
        ...omit(state, [groupID]),
        [groupID]: {
          ...omit(state[groupID], ['work']),
          work,
        },
      };
    }
    case DELETE_STUDENT_FROM_GROUP: {
      const { studentID, groupID } = action.payload;
      return {
        ...omit(state, [groupID]),
        [groupID]: {
          ...omit(state[groupID], ['members']),
          members: state[groupID].members.filter(
            memberID => memberID !== studentID
          ),
        },
      };
    }
    case ADD_STUDENT_TO_GROUP: {
      const { studentID, groupID } = action.payload;
      return {
        ...omit(state, [groupID]),
        [groupID]: {
          ...omit(state[groupID], ['members']),
          members: [...state[groupID].members, studentID],
        },
      };
    }

    default:
      return state;
  }
}
