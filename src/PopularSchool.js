import React from 'react';
import { connect } from 'react-redux';

const _PopularSchool = () => {
  return (
    <h1>hello from popular school page!</h1>
  );
};

const PopularSchool = connect(({ students, schools }) => {
  return {
    students,
    schools
  }
})(_PopularSchool);
 export default PopularSchool;
