import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div>
                <div>
                <h1>Welcome to TwitchParty</h1>
                <Link to='/parties/'>Parties</Link>
                </div>
            </div>
        );
    }
}

export default Homepage;