import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Link } from "react-router-dom"

const PartyStyle = styled.div`
    img {
        height: 200px;
        width: 500px;
    }
`;

class Parties extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
            parties: []
        }
    }

    componentWillMount() {
        axios.get("/api/party").then( (res) => {
            this.setState({ parties: res.data });
        }).catch( (error) => {
            console.log(error);
        })

        // Get user
        if (this.props.match.params.userId) {
            this.setState({
                userLogged: true,
            })
            axios.get(`/api/user/${this.props.match.params.userId}`)
                .then( (res) => {
                    this.setState({user: res.data});
                })
                .catch( (err) => {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div>
                <h1>Parties</h1>
                <div>
                 {this.state.userLogged ? <Link to={`/${this.state.user._id}/createParty`}>Create a Party</Link> :
                    <Link to='/createParty'>Create a Party</Link>}  
                {this.state.parties.map( (party, i) => {
                    return (
                        <PartyStyle key={i}>
                        {party.partyName}
                        <img src={party.bannerImage} alt='' />
                        {this.state.userLogged ? <a href={`/${this.state.user._id}/party/${party._id}`}>Go to</a> : 
                            <a href={`/party/${party._id}`}>Go to</a>}
                        </PartyStyle>
                    )
                })}
                <br />
                {this.state.userLogged ? <Link to={`/user/${this.state.user._id}`}>Go back to profile</Link> : null}
                </div>
            </div>
        );
    }
}

export default Parties;