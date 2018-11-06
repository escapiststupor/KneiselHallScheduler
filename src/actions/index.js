import { createAction } from 'redux-actions';

// for coaches
export const ADD_COACH = 'ADD_COACH';
export const addCoach = createAction(ADD_COACH);
export const DELETE_COACH = 'DELETE_COACH';
export const deleteCoach = createAction(DELETE_COACH);
export const DELETE_ALL_COACHES = 'DELETE_ALL_COACHES';
export const deleteAllCoaches = createAction(DELETE_ALL_COACHES);
export const CHANGE_COACH_NAME = 'CHANGE_COACH_NAME';
export const changeCoachName = createAction(CHANGE_COACH_NAME);
export const CHANGE_COACH_ROOM = 'CHANGE_COACH_ROOM';
export const changeCoachRoom = createAction(CHANGE_COACH_ROOM);
export const CHANGE_COACHING_TIME = 'CHANGE_COACHING_TIME';
export const changeCoachingTime = createAction(CHANGE_COACHING_TIME);

// for students
export const ADD_STUDENT = 'ADD_STUDENT';
export const addStudent = createAction(ADD_STUDENT);
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const deleteStudent = createAction(DELETE_STUDENT);
export const DELETE_ALL_STUDENTS = 'DELETE_ALL_STUDENTS';
export const deleteAllStudents = createAction(DELETE_ALL_STUDENTS);
export const CHANGE_STUDENT_NAME = 'CHANGE_STUDENT_NAME';
export const changeStudentName = createAction(CHANGE_STUDENT_NAME);
export const CHANGE_STUDENT_INST = 'CHANGE_STUDENT_INST';
export const changeStudentInst = createAction(CHANGE_STUDENT_INST);

// for groups
export const CREATE_GROUP = 'CREATE_GROUP';
export const createGroup = createAction(CREATE_GROUP);
export const DELETE_GROUP = 'DELETE_GROUP';
export const deleteGroup = createAction(DELETE_GROUP);
export const DELETE_ALL_GROUPS = 'DELETE_ALL_GROUPS';
export const deleteAllGroups = createAction(DELETE_ALL_GROUPS);
export const CHANGE_WORK = 'CHANGE_WORK';
export const changeWork = createAction(CHANGE_WORK);
export const CHANGE_COACH = 'CHANGE_COACH';
export const changeCoach = createAction(CHANGE_COACH);
export const DELETE_STUDENT_FROM_GROUP = 'DELETE_STUDENT_FROM_GROUP';
export const deleteStudentFromGroup = createAction(DELETE_STUDENT_FROM_GROUP);
export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';
export const addStudentToGroup = createAction(ADD_STUDENT_TO_GROUP);
