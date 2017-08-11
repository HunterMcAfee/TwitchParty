import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Parties from './components/Parties';
import Party from './components/Party';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component={Parties} />
        <Route exact path='/party/:partyId' component={Party} />
        </div>
      </Router>
    );
  }
}

export default App;
