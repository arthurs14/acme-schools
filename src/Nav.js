import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ students, schools }) => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({ schools.length })</Link>
      <Link to='/students'>Students ({ students.length })</Link>
    </nav>
  );
};

const Nav = connect(({ students, schools }) => {
  return {
    students,
    schools
  };
})(_Nav);

export default Nav;
