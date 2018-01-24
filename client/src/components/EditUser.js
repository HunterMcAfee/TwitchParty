import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import styled from 'styled-components';

const UserWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    font-size: 18px;
    
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
    h1 {
        background-color: #1a1a1a;
        width: 100%;
        text-align: center;
        padding: 25px;
        margin: 0px;
        font-family: 'Press Start 2P', cursive;
        color: white;
    }
    input {
        padding: 7px;
        margin: 2px;
        border: 3px solid #30113b;
        font-size: 1rem;
    }
`;

class EditUser extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            user: {
                _id: '',
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                bio: '',
                savedParties: []
            }
        }
    }

    componentWillMount() {
        const id = this.props.match.params.userId;
        axios.get(`/api/user/${id}`).then((res) => {
            this.setState({
                user: {
                    _id: res.data._id,
                    userName: res.data.userName,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    bio: res.data.bio,
                    savedParties: res.data.savedParties
                }
            })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    _editUser = (e) => {
        e.preventDefault();
        axios.put('/api/user', this.state.user)
            .then((res) => {
                console.log('Sucessfully sent edited user information');
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({ redirect: true });
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
            return <Redirect to={`/user/${this.state.user._id}`} />;
        } else {
            return (
                <UserWrapper>
                    <UserContainer>
                    <h1>Edit User</h1>
                    </UserContainer>
                    <form onSubmit={this._editUser}>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text' name='userName'
                            value={this.state.user.userName}
                            placeholder='User Name' />
                        </UserContainer>
                        <UserContainer>
                        <input onChange={this._handleUserChange}
                            type='text' name='firstName'
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
                        <button className='normalButton'>SUBMIT CHANGES</button>
                        </UserContainer>
                    </form>
                    <UserContainer>
                    <Link to={`/user/${this.state.user._id}`}><button className='normalButton'>GO BACK</button></Link>
                    </UserContainer>
                </UserWrapper>
            );
        }
    }
}

export default EditUser;