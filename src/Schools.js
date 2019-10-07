import React from 'react';
import { connect } from 'react-redux';
import { getSchools } from './store';

const _Schools = ({ schools }) => {
  //console.log(schools[0].name);
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
                    school.students.map(student =>
                      <li key={student.id}>
                        {student.firstName} {student.lastName}
                      </li>)
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
    getSchools: () => dispatch(getSchools())
  };
})(_Schools);

export default Schools;
