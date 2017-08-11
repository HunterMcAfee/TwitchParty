import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Parties from './components/Parties';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Parties} />
      </Router>
    );
  }
}

export default App;
