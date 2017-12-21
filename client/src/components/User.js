import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom";

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
    h3 {
        font-family: 'Press Start 2P', cursive;
        margin-bottom: 0px;
        color: white;
    }
`;

const UserInformation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 75%;
    color: white;
    h3 {
        font-family: 'Press Start 2P', cursive;
        padding-right: 10px;
        color: white;
    }
`;

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
                <UserWrapper>
                    <UserContainer>
                    <Link to={`/editUser/${this.state.user.id}`}><button className='normalButton'>EDIT</button></Link>
                    </UserContainer>

                    <UserInformation>
                    <div><h3>User Name: </h3>{this.state.user.userName}</div>
                    <div><h3>First Name: </h3>{this.state.user.firstName}</div>
                    <div><h3>Last Name: </h3>{this.state.user.lastName}</div>
                    <div><h3>Email: </h3>{this.state.user.email}</div>
                    <div><h3>Bio: </h3>{this.state.user.bio}</div>
                    </UserInformation>

                    <UserContainer>
                    <div><h3>Saved Parties:</h3>
                        <br />
                    {this.state.user.savedParties.map( (party, i) => {
                        return (
                            <div key={i}>
                            <Link to={`/${this.state.user.id}/party/${party._id}`}>{party.partyName}</Link>
                            </div>
                        )
                    })}
                    </div>
                    </UserContainer>
                    
                    <UserContainer>
                    <Link to={`/${this.state.user.id}/parties`}><button className='watchButton'>CONTINUE TO PARTIES</button></Link>
                    </UserContainer>

                    <UserContainer>
                    <button className='normalButton' onClick={(e) => this._handleDelete(e, this.state.user.id)}>DELETE</button>
                    </UserContainer>

                    <UserContainer>
                    <Link to={`/users`}><button className='normalButton'>GO BACK</button></Link>
                    </UserContainer>
                </UserWrapper>
            );
        }
    }
}

export default User;