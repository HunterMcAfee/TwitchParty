import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

class Homepage extends Component {
    render() {
        return (
            <div>
                    <h1 className='bitFont welcome'>Welcome</h1>
                    <h1 className='bitFont welcome'>to</h1>
                    <h1 className='bitFont welcome'>TwitchParty</h1>
                    <Link to='/parties/'><button className='normalButton'>GO TO PARTIES</button></Link>
                    <Link to='/users'><button className='normalButton'>USER LOGIN</button></Link>
             
            </div>
        );
    }
}

export default Homepage;