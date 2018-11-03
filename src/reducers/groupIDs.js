import {
  CREATE_GROUP,
  DELETE_GROUP,
  DELETE_ALL_STUDENTS,
  DELETE_ALL_COACHES,
  DELETE_ALL_GROUPS,
  DELETE_COACH,
  DELETE_STUDENT,
} from '../actions';

export default function groupIDs(state = [], action) {
  switch (action.type) {
    case CREATE_GROUP:
      return [...state, action.payload.id];
    case DELETE_GROUP:
      return state.filter(id => id !== action.payload);
    case DELETE_ALL_STUDENTS:
    case DELETE_ALL_COACHES:
    case DELETE_ALL_GROUPS:
      return [];
    case DELETE_COACH: {
      const { ID: coachID, groupList } = action.payload;
      const groupID2Delete = [];
      Object.keys(groupList).forEach(groupID => {
        if (groupList[groupID].coachID === coachID)
          groupID2Delete.push(groupID);
      });
      return state.filter(id => !groupID2Delete.includes(id));
    }
    case DELETE_STUDENT: {
      const { ID: studentID, groupList } = action.payload;
      const groupID2Delete = [];
      Object.keys(groupList).forEach(groupID => {
        if (groupList[groupID].members.includes(studentID))
          groupID2Delete.push(groupID);
      });
      return state.filter(id => !groupID2Delete.includes(id));
    }
    default:
      return state;
  }
}
