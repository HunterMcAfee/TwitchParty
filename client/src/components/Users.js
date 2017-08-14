import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
            <div>
                <Link to={`/createUser`}>Create a User</Link>
                <br /><br />
                {this.state.users.map( (user, i) => {
                    return (
                        <div key={i}>
                        {user.userName}
                        <a href={`/user/${user._id}`}>Go to</a>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Users;