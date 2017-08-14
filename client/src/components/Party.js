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
            user: '',
            userLogged: false,
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

    _handleDelete = (e, partyId) => {
        axios.get(`/api/party/delete/${partyId}`)
            .then(() => console.log('Deleted'))
            .catch((err) => console.log(err));
        this.setState({ redirect: true })
    }

    _addToFavorites = (e) => {
        e.preventDefault();
        const favoriteParty = {
            _id: this.state.id,
            partyName: this.state.partyName,
            bannerImage: this.state.bannerImage,
            description: this.state.description,
            games: this.state.games,
            streamers: this.state.streamers
        }
        const userId = this.state.user._id;
        const payload = {
            favoriteParty: favoriteParty,
            userId: userId
        }
        axios.post('/api/user/favoriteParty', payload)
            .then( (res) => {
                console.log('Sent favorite party info');
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    render() {
        if (this.state.redirect) {
            if (this.state.userLogged){
                return <Redirect to={`/${this.state.user._id}/parties`} />;
            } else {
                return <Redirect to={`/parties`} />
            }
        } else {
            return (
                <div>
                    <IndividualPartyStyle>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/edit/${this.state.id}`}>Edit</Link> :
                            <Link to={`/edit/${this.state.id}`}>Edit</Link>}

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
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/streamers/${this.state.id}`}>WATCH</Link> :
                            <Link to={`/streamers/${this.state.id}`}>WATCH</Link>}
                        <br /><br />
                        {this.state.userLogged ? <button onClick={(e) => this._addToFavorites(e)}>Add to Favorites</button> : null}
                        <br /><br />
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/parties`}>Go back</Link> :
                            <Link to={`/parties`}>Go back</Link>}
                    </IndividualPartyStyle>
                </div>
            );
        }
    }
}

export default Party;