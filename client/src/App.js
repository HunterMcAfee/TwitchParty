import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Parties from './components/Parties';
import Party from './components/Party';
import CreateParty from './components/CreateParty';
import EditParty from './components/EditParty';
import Streamers from './components/Streamers';
import Users from './components/Users';
import Homepage from './components/Homepage';
import User from './components/User';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import styled from 'styled-components';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          {/* Routing User Not Logged In */}
          <Route exact path='/' component={Homepage} />
          <Route exact path='/parties' component={Parties} />
          <Route exact path='/party/:partyId' component={Party} />
          <Route exact path='/createParty' component={CreateParty} />
          <Route exact path='/edit/:partyId' component={EditParty} />
          <Route exact path='/streamers/:partyId' component={Streamers} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/user/:userId' component={User} />
          <Route exact path='/createUser'component={CreateUser} />
          <Route exact path='/editUser/:userId' component={EditUser} />

          {/* Routing User Is Logged In */}
          <Route exact path='/:userId/parties' component={Parties} />
          <Route exact path='/:userId/party/:partyId' component={Party} />
          <Route exact path='/:userId/createParty' component={CreateParty} />
          <Route exact path='/:userId/edit/:partyId' component={EditParty} />
          <Route exact path='/:userId/streamers/:partyId' component={Streamers} />
        </div>
      </Router>
    );
  }
}

export default App;
