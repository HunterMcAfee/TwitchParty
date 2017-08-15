import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

const NavBarStyle = styled.div`
    background-color: #3a235c;
    width: 100%;
    height: 50px;
    font-color: white;
    h2 {
        font-family: 'Press Start 2P', cursive;
        text-decoration: none;
        color: white;
        text-align: left;
        padding: 15px;
        margin: 0;
    }
`;

class NavBar extends Component {
    _handleClick = () => {
        <Redirect to='/' />
    }
    render() {
        return (
            <div>
                <NavBarStyle>
                <h2>TwitchParty</h2>
                </NavBarStyle>
            </div>
        );
    }
}

export default NavBar;