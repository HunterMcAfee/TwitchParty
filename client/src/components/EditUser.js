import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

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
                <div>
                    <h1>Edit User</h1>
                    <form onSubmit={this._editUser}>
                        <input onChange={this._handleUserChange}
                            type='text' name='userName'
                            value={this.state.user.userName}
                            placeholder='User Name' />
                        <br />
                        <input onChange={this._handleUserChange}
                            type='text' name='firstName'
                            value={this.state.user.firstName}
                            placeholder='First Name' />
                        <br />
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='lastName'
                            value={this.state.user.lastName}
                            placeholder='Last Name' />
                        <br />
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='email'
                            value={this.state.user.email}
                            placeholder='Email' />
                        <br />
                        <input onChange={this._handleUserChange}
                            type='text'
                            name='bio'
                            value={this.state.user.bio}
                            placeholder='Bio' />
                        <br />
                        <br />
                        <button>Submit Changes</button>
                    </form>
                    <br />
                    <Link to={`/user/${this.state.user._id}`}>Go back</Link>
                </div>
            );
        }
    }
}

export default EditUser;