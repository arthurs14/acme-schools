import React from 'react';
import { connect } from 'react-redux';
import { getSchools } from './store';

const _Schools = ({ schools }) => {
  return (
    <div>
      <ul>
        {
          schools.map(school => <li key={school.id}>{ school.name }</li>)
        }
      </ul>
    </div>
  );
};

const Schools = connect(({ schools }) => {
  return {
    schools
  };
}, (dispatch) => {
  return {
    getSchools: () => dispatch(getSchools())
  };
})(_Schools);

export default Schools;
