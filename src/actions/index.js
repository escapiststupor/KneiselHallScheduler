import { createAction } from 'redux-actions';

// for coaches
export const ADD_COACH = 'ADD_COACH';
export const addCoach = createAction(ADD_COACH);
export const DELETE_COACH = 'DELETE_COACH';
export const deleteCoach = createAction(DELETE_COACH);
export const DELETE_ALL_COACHES = 'DELETE_ALL_COACHES';
export const deleteAllCoaches = createAction(DELETE_ALL_COACHES);

// for students
export const ADD_STUDENT = 'ADD_STUDENT';
export const addStudent = createAction(ADD_STUDENT);
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const deleteStudent = createAction(DELETE_STUDENT);
export const DELETE_ALL_STUDENTS = 'DELETE_ALL_STUDENTS';
export const deleteAllStudents = createAction(DELETE_ALL_STUDENTS);

// for groups
export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroup = createAction(CREATE_GROUP);
export const DELETE_GROUP = 'DELETE_GROUP';
export const deleteGroup = createAction(DELETE_GROUP);
export const SET_WORK = 'SET_WORK';
export const setWork = createAction(SET_WORK);
export const SET_COACH = 'SET_COACH';
export const setCoach = createAction(SET_COACH);
export const SET_MEMBERS = 'SET_MEMBERS';
export const setMembers = createAction(SET_MEMBERS);
export const SET_REHEARSAL_PLACE = 'SET_REHEARSAL_PLACE';
export const setRehearsalPlace = createAction(SET_REHEARSAL_PLACE);
export const SET_REHEARSAL_TIME = 'SET_REHEARSAL_TIME';
export const setRehearsalTime = createAction(SET_REHEARSAL_TIME);
export const SET_COACHING_TIME = 'SET_COACHING_TIME';
export const setCoachingTime = createAction(SET_COACHING_TIME);
