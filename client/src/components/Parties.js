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
            parties: []
        }
    }

    componentWillMount() {
        axios.get("/api/party").then( (res) => {
            this.setState({ parties: res.data });
        }).catch( (error) => {
            console.log(error);
        })
    }


    render() {
        return (
            <div>
                <h1>Parties</h1>
                <div>
                <Link to='/createParty'>Create a Party</Link>
                {this.state.parties.map( (party, i) => {
                    return (
                        <PartyStyle key={i}>
                        {party.partyName}
                        <img src={party.bannerImage} alt='' />
                        <a href={`/party/${party._id}`}>Go to</a>
                        </PartyStyle>
                    )
                })}
                </div>
            </div>
        );
    }
}

export default Parties;