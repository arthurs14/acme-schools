import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const SET_SCHOOLS = 'SET_SCHOOLS';
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';

const studentsReducer = (state = [], action) => {
  switch(action.type) {
    case SET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...state, action.student];
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

const createStudent = () => {
  return async (dispatch) => {
    const student = (await axios.post(`${API}/students`)).data;
    console.log(student);
    dispatch(addStudent(student));
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
export { setStudents, addStudent, setSchools, getStudents, createStudent, getSchools };
