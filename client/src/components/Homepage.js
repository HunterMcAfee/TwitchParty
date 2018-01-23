import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePageStyling = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #1a1a1a;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 40px;
        color: white;
    }
    p {
        color: white;
    }
`;

const HomePageContainer = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: #1a1a1a;
    width: 80%
`;

class Homepage extends Component {
    render() {
        return (
            <HomePageStyling>
                <HomePageContainer>
                    <h1>Welcome to TwitchParty</h1>
                </HomePageContainer>
            
                <HomePageContainer>
                    <Link to='/parties/'><button className='normalButton' style={{margin: "5px"}}>GO TO PARTIES</button></Link>
                    <Link to='/users'><button className='normalButton' style={{margin: "5px"}}>USER LOGIN</button></Link>
                </HomePageContainer>
            </HomePageStyling>
        );
    }
}

export default Homepage;