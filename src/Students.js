import React from 'react';
import { connect } from 'react-redux';
import { getStudents } from './store';

const _Students = ({ students }) => {
  return (
    <div>
      <ul>
        {
          students.map( student =>
          <li key={ student.id }>
            { student.firstName } { student.lastName }
          </li>)
        }
      </ul>
    </div>
  );
};

const Students = connect(({ students }) => {
  return {
    students
  };
}, (dispatch) => {
  return {
    getStudents: () => dispatch(getStudents)
  }
})(_Students);

export default Students;
