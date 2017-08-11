import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Parties from './components/Parties';
import Party from './components/Party';
import CreateParty from './components/CreateParty';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component={Parties} />
        <Route exact path='/party/:partyId' component={Party} />
        <Route exact path='/createParty' component={CreateParty} />
        </div>
      </Router>
    );
  }
}

export default App;
