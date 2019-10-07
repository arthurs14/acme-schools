import React from 'react';
import { connect } from 'react-redux';
import { createStudent, getSchools } from './store';

class _StudentForm extends React.Component {
  constructor() {
    super();
    //const schools = this.props.schools;
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA: 0.0,
      schoolId: null
    };
    this.onChange = this.onChange.bind(this);
    this.create = this.create.bind(this);
  }

  onChange(ev) {
    this.setState({ [ ev.target.name ]: ev.target.value });
    // console.log(`${ev.target.name}: ${ev.target.value}`);
  }

  async create(ev) {
    ev.preventDefault();
    // console.log(this.state.schoolId);

    if(this.state.schoolId === "" ){
      this.state.schoolId = null;
    }
    await this.props.createStudent(this.state);
  }

  render() {
    const { firstName, lastName, email, GPA } = this.state;
    const { onChange, create } = this;
    return (
      <div>
        <form onSubmit={ create } method='POST'>
          <label htmlFor="firstName">First Name </label>
          <input value={ firstName } type="text" name="firstName" onChange={ onChange } /> <br />
          <label htmlFor="lastName">Last Name </label>
          <input value={ lastName } type="text" name="lastName" onChange={ onChange } /> <br />
          <label htmlFor="email">Email </label>
          <input value={ email } type="text" name="email" onChange={ onChange } /> <br />
          <label htmlFor="gpa">GPA </label>
          <input value={ GPA } type="text" name="GPA" onChange={ onChange } /> <br />
          <select name="schoolId" onChange={ onChange }>
            <option value="">-- Not Enrolled --</option>
            {
              this.props.schools.map( school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
          </select>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const StudentForm = connect(({ schools }) => {
  return {
    schools
  }
}, (dispatch) => {
  return {
    createStudent: (student) => dispatch(createStudent(student))
  }
})(_StudentForm);

export default StudentForm;
