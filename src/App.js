import React from 'react';
import { HashRouter, Route  } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStudents, getSchools } from './store';

import Nav from './Nav';

class _App extends React.Component {
  componentDidMount() {
    this.props.getData();
  }
  render() {
    return (
        <HashRouter>
          <Route component={ Nav } />
        </HashRouter>
    );
  }
}

const App = connect(null, (dispatch) => {
  return {
    getData: () => {
      dispatch(getStudents());
      dispatch(getSchools());
    }
  };
})(_App);

export default App;
