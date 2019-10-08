import React from 'react';
import { connect } from 'react-redux';
import StudentForm from './StudentForm';
import { deleteStudent, enrollStudent } from './store';

const _Students = ({ students, schools, enrollStudent, deleteStudent }) => {
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
              <select name="schoolId" onClick={(ev) => enrollStudent(student, ev.target.value)}>
                <option value="">Not Enrolled</option>
                {
                  schools.map(school =>
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>)
                }
              </select>
              <button onClick={() => deleteStudent(student)}>Delete</button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

const Students = connect(({ students, schools }) => {
  return {
    students,
    schools
  };
}, (dispatch) => {
  return {
    enrollStudent: (student, schoolId) => dispatch(enrollStudent(student, schoolId)),
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
})(_Students);

export default Students;
