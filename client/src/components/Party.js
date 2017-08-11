import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const IndividualPartyStyle = styled.div`
    img {
        height: 500px;
        width: 800px;
    }
`;

class Party extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            partyName: '',
            bannerImage: '',
            description: '',
            games: [],
            streamers: []
        }
    }

    componentWillMount() {
        const id = this.props.match.params.partyId;
        axios.get(`/api/party/${id}`).then( (res) => {
            this.setState({
                id: res.data._id,
                partyName: res.data.partyName,
                bannerImage: res.data.bannerImage,
                description: res.data.description,
                games: res.data.games,
                streamers: res.data.streamers
            })
        })
    }

    render() {
        return (
            <div>
            <IndividualPartyStyle>
                <h1>Party Name: {this.state.partyName}</h1>
                <img src={this.state.bannerImage}></img>
                <div>Description: {this.state.description}</div>
                <br />
                <div>Games Played: {this.state.games.map( (game, i) => {
                    return(
                        <div key={i}>{game}</div>
                    )})}</div>
                <br />
                <div>Streamers: {this.state.streamers.map( (streamer, i) => {
                    return(
                        <div key={i}>{streamer.userName}</div>
                    )})}</div>
            </IndividualPartyStyle>
            </div>
        );
    }
}

export default Party;