import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Party from './components/Party';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Party} />
      </Router>
    );
  }
}

export default App;
