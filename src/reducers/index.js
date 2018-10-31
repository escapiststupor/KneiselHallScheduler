import { combineReducers } from 'redux';
import coaches from './coaches';
import students from './students';
import groups from './groups';

export default combineReducers({
  coaches,
  students,
  groups,
});
