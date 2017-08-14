import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"

class User extends Component {
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

    componentWillMount() {
        const id = this.props.match.params.userId;
        axios.get(`/api/user/${id}`).then((res) => {
            this.setState({
                user: {
                    id: res.data._id,
                    userName: res.data.userName,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    bio: res.data.bio,
                    savedParties: res.data.savedParties
                }
            })
        })
    }

    _handleDelete = (e, userId) => {
        e.preventDefault();
        axios.get(`/api/user/delete/${userId}`)
            .then(() => console.log('User Deleted'))
            .catch((err) => console.log(err));
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/users'} />;
        } else {
            return (
                <div>
                    <div>{this.state.user.userName}</div>
                    <div>{this.state.user.firstName}</div>
                    <div>{this.state.user.lastName}</div>
                    <div>{this.state.user.email}</div>
                    <div>{this.state.user.bio}</div>
                    <div>Saved Parties:
                    {this.state.user.savedParties.map( (party) => {
                        return party.partyName
                    })}
                    </div>
                    <button onClick={(e) => this._handleDelete(e, this.state.user.id)}>Delete</button>
                </div>
            );
        }
    }
}

export default User;