import { combineReducers } from 'redux';
import coachList from './coachList';
import coachIDs from './coachIDs';
import studentList from './studentList';
import studentIDs from './studentIDs';
import groupList from './groupList';
import groupIDs from './groupIDs';

export default combineReducers({
  coaches: combineReducers({
    coachList,
    coachIDs,
  }),
  students: combineReducers({
    studentList,
    studentIDs,
  }),
  groups: combineReducers({
    groupList,
    groupIDs,
  }),
});
