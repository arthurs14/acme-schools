import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ schools, students }) => {
  // Finds popular school
  const allSchools = schools.map(school => school.students.length);
  const indexOfMax = allSchools.indexOf(Math.max(...allSchools));
  const school = {...schools[indexOfMax]};
  const totalStudents = students.filter(student => student.schoolId === school.id);

  // Finds top school by average GPA


  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({ schools.length })</Link>
      <Link to='/students'>Students ({ students.length })</Link>
      <Link to={`/schools/${school.id}`}>
        Most Popular School: {school.name} ({totalStudents.length})
      </Link>
      <Link to='/schools/:id'>Top School: {}</Link>
    </nav>
  );
};

const Nav = connect(({ schools, students }, props) => {
  return {
    schools,
    students,
    props
  };
})(_Nav);

export default Nav;
