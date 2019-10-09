import React from 'react';
import { connect } from 'react-redux';

const _PopularSchool = ({ students, schools, location }) => {
  const schoolId = location.pathname.slice(9);
  const school = {...schools.find(school => school.id === schoolId)};
  const schoolStudents = students.filter(student => student.schoolId === schoolId);
  //console.log(schoolStudents.length);
  return (
    <div>
      <h2>{school.name} ({schoolStudents.length} students enrolled)</h2>
      <ul>
        {
          schoolStudents.map(student =>
            <li key={student.id}>
              { student.firstName } { student.lastName }
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
})(_PopularSchool);
 export default PopularSchool;
