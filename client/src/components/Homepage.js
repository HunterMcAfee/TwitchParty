import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <div>
                <h1>Welcome to TwitchParty</h1>
                <Link to='/parties/'>Parties</Link>
                <br />
                <Link to='/users'>Login as user</Link>
                </div>
            </div>
        );
    }
}

export default Homepage;