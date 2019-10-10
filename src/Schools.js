import React from 'react';
import { connect } from 'react-redux';
import { unenrollStudent } from './store';

const _Schools = ({ schools, students, unenrollStudent }) => {
  return (
    <div>
      <ul>
        {
          schools.map(school =>
            <li key={school.id}>
              {school.name}
              {
                <ul>
                  {
                    students.filter(student => student.schoolId === school.id).map(studentEnrolled =>
                      <li key={studentEnrolled.id}>
                        {studentEnrolled.firstName} {studentEnrolled.lastName}
                        <button onClick={() => unenrollStudent(studentEnrolled)}>Unenroll</button>
                      </li> )
                  }
                </ul>
                }
            </li>)
        }
      </ul>
    </div>
  );
};

const Schools = connect(({ schools, students }) => {
  return {
    schools,
    students
  };
}, (dispatch) => {
  return {
    unenrollStudent: (student) => dispatch(unenrollStudent(student))
  };
})(_Schools);

export default Schools;
