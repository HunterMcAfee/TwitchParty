import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
            .then( (res) => {
                console.log('Sucessfully sent new user information');
            })
            .catch ( (err) => {
                console.log(err);
            })
    }

    _handleUserChange = (event) => {
        const attributeName = event.target.name;
        const attibuteValue = event.target.value;

        const updateUser = {...this.state}
        updateUser.user[attributeName] = attibuteValue;
        this.setState(updateUser);
    }


    render() {
        return (
            <div>
                <h1>Create User</h1>
                <form onSubmit={this._createUser}>
                <input onChange={this._handleUserChange} type='text' name='userName' value={this.state.user.userName} placeholder='User Name' />
                <br />
                <input onChange={this._handleUserChange} type='text' name='firstName' value={this.state.user.firstName} placeholder='First Name' />
                <br />
                <input onChange={this._handleUserChange} type='text' name ='lastName' value={this.state.user.lastName} placeholder='Last Name' />
                <br />
                <input onChange={this._handleUserChange} type='text' name ='email' value={this.state.user.email} placeholder='Email' />
                <br />
                <input onChange={this._handleUserChange} type='text' name ='bio' value={this.state.user.bio} placeholder='Bio' />
                <br />
                <br />
                <button>Create Party</button>           
                </form>
                <br />
                <Link to='/users'>Go back</Link>
            </div>
        );
    }
}

export default CreateUser;