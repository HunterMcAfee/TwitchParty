import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

const NavBarStyle = styled.div`
    background-color: #3F275C;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    a {
        color: white;
        font-family: 'Press Start 2P';
        text-decoration: none;
        font-size: 30px;
        margin-left: 10px;
    }
    a:hover {
        color: darkgrey;
    }
`;
class NavBar extends Component {
    render() {
        return (
            <NavBarStyle>
                <a href="/">TwitchParty</a>
            </NavBarStyle>
        );
    }
}

export default NavBar;