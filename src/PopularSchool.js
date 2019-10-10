import React from 'react';
import { connect } from 'react-redux';
import { unenrollStudent, enrollStudent } from './store';

const _PopularSchool = ({ students, schools, location, enrollStudent, unenrollStudent }) => {
  const schoolId = location.pathname.slice(9);
  const school = {...schools.find(school => school.id === schoolId)};
  const schoolStudents = students.filter(student => student.schoolId === schoolId);
  //const unenrolledStudent = students.filter(student => student.schoolId === null);
  //console.log(schoolStudents.length);
  return (
    <div>
      <h2>{school.name} ({schoolStudents.length} students enrolled)</h2>
      <select name="student" onClick={(ev) => console.log(JSON.parse(ev.target.value))}>
        <option value="">-- Add Student --</option>
        {
          students.filter(student => student.schoolId === null).map(student =>
            <option key={student.id} value={student} >{student.firstName} {student.lastName}</option>
          )
        }
      </select>
      <ul>
        {
          schoolStudents.map(student =>
            <li key={student.id}>
              { student.firstName } { student.lastName } <br />
              GPA: { student.GPA } <br />
              <button onClick={() => unenrollStudent(student)}>Unenroll</button>
            </li>)
        }
      </ul>
    </div>

  );
};

const PopularSchool = connect(({ students, schools }) => {
  return {
    students,
    schools
  }
}, (dispatch) => {
  return {
    enrollStudent: (student, schoolId) => dispatch(enrollStudent(student, schoolId)),
    unenrollStudent: (student) => dispatch(unenrollStudent(student))
  };
})(_PopularSchool);

export default PopularSchool;
