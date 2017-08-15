import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className='topNav'>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">TwitchParty</a>
                        <ul className="right">
                            <li><a href="/" className='homeLink'>Home</a></li>                        
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;