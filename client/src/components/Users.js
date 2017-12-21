import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const UserWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-top: 20px;
    
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
    h3 {
        font-family: 'Press Start 2P', cursive;
        padding-right: 10px;
        color: white;
    }
`;

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
            }
        }
    
    componentWillMount() {
        axios.get('/api/user')
            .then((res) => {
            this.setState({
                users: res.data
            })
         })
    }

    render() {
        return (
            <UserWrapper>
                <UserContainer>
                <Link to={`/createUser`}><button className='normalButton'>CREATE A USER</button></Link>
                </UserContainer>
                {this.state.users.map( (user, i) => {
                    return (
                        <UserContainer key={i}>
                        <h3>{user.userName}</h3>
                        <a href={`/user/${user._id}`}><button className='normalButton'>LOG IN</button></a>
                        </UserContainer>
                    )
                })}
            </UserWrapper>
        );
    }
}

export default Users;