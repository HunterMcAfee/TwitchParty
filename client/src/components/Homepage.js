import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePageStyling = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 40px;
    margin-top: 50px;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 50px;
        color: white;
    }
`;

const HomePageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
`;

class Homepage extends Component {
    render() {
        return (
            <HomePageStyling>
                <HomePageContainer>
                    <h1>Welcome</h1>
                </HomePageContainer>
                <HomePageContainer>
                    <h1>to</h1>
                </HomePageContainer>
                <HomePageContainer>
                    <h1>TwitchParty</h1>
                </HomePageContainer>
                <HomePageContainer>
                    <Link to='/parties/'><button className='normalButton'>GO TO PARTIES</button></Link>
                </HomePageContainer>    
                <br /><br /><br />
                <HomePageContainer>
                    <Link to='/users'><button className='normalButton'>USER LOGIN</button></Link>
                </HomePageContainer>
            </HomePageStyling>
        );
    }
}

export default Homepage;