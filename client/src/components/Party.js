import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"

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
            redirect: false,
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
        axios.get(`/api/party/${id}`).then((res) => {
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

    _handleDelete = (e, partyId) => {
        axios.get(`/api/party/delete/${partyId}`)
            .then(() => console.log('Deleted'))
            .catch((err) => console.log(err));
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />;
        } else {
            return (
                <div>
                    <IndividualPartyStyle>
                        <Link to={`/edit/${this.state.id}`}>Edit</Link>

                        <h1>Party Name: {this.state.partyName}</h1>
                        <img src={this.state.bannerImage} alt=''></img>
                        <div>Description: {this.state.description}</div>

                        <br />

                        <div>Games Played: {this.state.games.map((game, i) => {
                            return (
                                <div key={i}>{game}</div>
                            )
                        })}</div>

                        <br />

                        <div>Streamers: {this.state.streamers.map((streamer, i) => {
                            return (
                                <div key={i}>{streamer.userName}</div>
                            )
                        })}</div>

                        <br />

                        <button onClick={(e) => this._handleDelete(e, this.state.id)}>Delete</button>

                        <br /><br />

                        <Link to={`/streamers/${this.state.id}`}>WATCH</Link>

                        <br /><br />
                        
                        <Link to={`/parties`}>Go back</Link>
                    </IndividualPartyStyle>
                </div>
            );
        }
    }
}

export default Party;