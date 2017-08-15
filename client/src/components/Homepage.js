import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

class Homepage extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row alignCenter'>
                    <h1 className='bitFont welcome'>Welcome</h1>
                </div>
                <div className='row alignCenter'>
                    <h1 className='bitFont welcome'>to</h1>
                </div>
                <div className='row alignCenter'>
                    <h1 className='bitFont welcome'>TwitchParty</h1>
                </div>
                <div className='row alignCenter'>
                    <Link to='/parties/'><button className='normalButton'>GO TO PARTIES</button></Link>
                </div>
                <div className='row alignCenter'>
                    <Link to='/users'><button className='normalButton'>USER LOGIN</button></Link>
                </div>
            </div>
        );
    }
}

export default Homepage;