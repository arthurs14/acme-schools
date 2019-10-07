import React from 'react';
import { connect } from 'react-redux';
import StudentForm from './StudentForm';
import { deleteStudent } from './store';

const _Students = ({ students, deleteStudent }) => {
  return (
    <div>
      <StudentForm />
      <h2>Enrolled Students:</h2>
      <ul>
        {
          students.filter( student => student.schoolId !== null).map(student =>
            <li key={ student.id }>
              { student.firstName } { student.lastName }
              <button onClick={() => deleteStudent(student)}>Delete</button>
            </li>
          )
        }
      </ul>
      <h2>Unenrolled Students</h2>
      <ul>
        {
          students.filter( student => student.schoolId === null).map(student =>
            <li key={ student.id }>
              { student.firstName } { student.lastName }
              <button onClick={() => deleteStudent(student)}>Delete</button>
            </li>
          )
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
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
})(_Students);

export default Students;
