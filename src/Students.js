import React from 'react';
import { connect } from 'react-redux';
import StudentForm from './StudentForm';

const _Students = ({ students }) => {
  return (
    <div>
      <StudentForm />
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
})(_Students);

export default Students;
