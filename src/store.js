import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const SET_SCHOOLS = 'SET_SCHOOLS';
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DEL_STUDENT = 'DEL_STUDENT';
const UPD_STUDENT = 'UPT_STUDENT';

const studentsReducer = (state = [], action) => {
  switch(action.type) {
    case SET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...state, action.student];
    case DEL_STUDENT:
      return state.filter( student => student.id !== action.student.id);
    case UPD_STUDENT:
      //creates new array with new student object
      return state.map(student => student.id === action.student.id ? action.student : student);
  }
  return state;
};

const schoolsReducer = (state = [], action) => {
  switch(action.type) {
    case SET_SCHOOLS:
      return action.schools;
  }
  return state;
};

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

// ACTION CREATORS
const setStudents = (students) => ({ type: SET_STUDENTS, students });
const addStudent = (student) => ({ type: ADD_STUDENT, student });
const destroyStudent = (student) => ({ type: DEL_STUDENT, student });
const updateStudent = (student) => ({ type: UPD_STUDENT, student });

const setSchools = (schools) => ({ type: SET_SCHOOLS, schools });

// METHODS
const API = '/api';

// Student Calls
const getStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get(`${API}/students`)).data;
    dispatch(setStudents(students));
  };
};

const createStudent = (student) => {
  return async (dispatch) => {
    const created = (await axios.post(`${API}/students`, student)).data;
    dispatch(addStudent(created));
  }
};

const unenrollStudent = (student) => {
  // removes schoolId's value and turns it to null
  student.schoolId = null;
  return async (dispatch) => {
    await axios.put(`${API}/students/${student.id}`, student);
    return dispatch(updateStudent(student));
  };
};

const enrollStudent = (student, schoolId) => {
  //change school from null to chosen one
  student.schoolId = schoolId;
  return async (dispatch) => {
    await axios.put(`${API}/students/${student.id}`, student);
    return dispatch(updateStudent(student));
  };
};

const deleteStudent = (student) => {
  return async (dispatch) => {
    await axios.delete(`${API}/students/${student.id}`, student);
    return dispatch(destroyStudent(student));
  }
};

// School Calls
const getSchools = () => {
  return async (dispatch) => {
    const schools = (await axios.get(`${API}/schools`)).data;
    dispatch(setSchools(schools));
  };
};

export default store;
export { setStudents, addStudent, setSchools, getStudents, createStudent, deleteStudent, unenrollStudent, enrollStudent, getSchools };
