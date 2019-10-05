import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

class _StudentForm extends React.Component {
  constructor({ schools, createStudent }) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: 0.0,
      schools
    }
  }
  render() {
    const { firstName, lastName, email, gpa, schools } = this.state;
    return (
      <div>
        <form onSubmit={ ev => ev.preventDefault() } method='POST'>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" /> <br />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" /> <br />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" /> <br />
          <label htmlFor="GPA">GPA</label>
          <input type="text" name="gpa" />
          <select>
            <option value='noSchool'>-- Not Enrolled --</option>
            {
              schools.map( school => <option key={school.id} value={school.name}>{school.name}</option>)
            }
          </select>
          <button onClick={ createStudent }>Save</button>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

const StudentForm = connect(({ schools }) => {
  return {
    schools
  };
}, (dispatch) => {
  createStudent: () => dispatch(createStudent())
})(_StudentForm);

export default StudentForm;
