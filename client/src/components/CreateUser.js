import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import styled from 'styled-components';

const UserWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-top: 20px;
    font-size: 18px;
    
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
    h1 {
        font-family: 'Press Start 2P', cursive;
        margin-bottom: 0px;
    }
`;

class CreateUser extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            user: {
                id: '',
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                bio: '',
                savedParties: []
            }
        }
    }

    _createUser = (e) => {
        e.preventDefault();
        axios.post('/api/user', this.state.user)
            .then((res) => {
                console.log('Sucessfully sent new user information');
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({redirect: true});
    }

    _handleUserChange = (event) => {
        const attributeName = event.target.name;
        const attibuteValue = event.target.value;

        const updateUser = { ...this.state }
        updateUser.user[attributeName] = attibuteValue;
        this.setState(updateUser);
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={`/users`} />;
        } else {
            return (
                <UserWrapper>
                    <UserContainer>
                    <h1>Create User</h1>
                    </UserContainer>
                    <form onSubmit={this._createUser}>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='userName'
                            value={this.state.user.userName}
                            placeholder='User Name' />
                        </UserContainer>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='firstName'
                            value={this.state.user.firstName}
                            placeholder='First Name' />
                        </UserContainer>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='lastName'
                            value={this.state.user.lastName}
                            placeholder='Last Name' />
                        </UserContainer>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='email'
                            value={this.state.user.email}
                            placeholder='Email' />
                        </UserContainer>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='bio'
                            value={this.state.user.bio}
                            placeholder='Bio' />
                        </UserContainer>
                        <UserContainer>
                        <button className='normalButton'>Create User</button>
                        </UserContainer>
                    </form>
                    <UserContainer>
                    <Link to='/users'><button className='normalButton'>GO BACK</button></Link>
                    </UserContainer>
                </UserWrapper>
            );
        }
    }
}

export default CreateUser;