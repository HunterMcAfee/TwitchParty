import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"

const PartyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-around;
    flex-wrap: wrap;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 50px;
        margin-top: 20px;
        margin-bottom: 0px;
    }
    img {
        height: 500px;
        width: 800px;
    }
`;

const PartyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Information = styled.div`
    font-weight: bold;
    font-size: 14;
    background-color: #1a1a1a;
    color: white;
    padding: 10px;
`;

const EditDelete = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
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
        alert(`${this.state.partyName} party was added to your favorites list!`);
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
                    <PartyWrapper>
                        <PartyContainer>
                        <h1>{this.state.partyName}</h1>
                        </PartyContainer>

                        <PartyContainer>
                        <img src={this.state.bannerImage} alt=''></img>
                        </PartyContainer>

                        <PartyContainer>
                        <Information>{this.state.description}</Information>
                        {/* <div>Games Played: {this.state.games.map((game, i) => {
                            return (
                                <div key={i}>{game}</div>
                            )
                        })}</div> */}
                        </PartyContainer>
                        
                        <PartyContainer>
                        <Information>STREAMERS: {this.state.streamers.map((streamer, i) => {
                            return (
                                <div key={i}>{streamer.userName}</div>
                            )
                        })}</Information>
                        </PartyContainer>

                        <EditDelete>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/edit/${this.state.id}`}><button className="normalButton" style={{marginLeft: "100px", marginRight: "100px"}}>EDIT PARTY</button></Link> :
                            <Link to={`/edit/${this.state.id}`}><button className="normalButton">EDIT PARTY</button></Link>}
                        
                        <button className='normalButton' onClick={(e) => this._handleDelete(e, this.state.id)} style={{marginLeft: "100px", marginRight: "100px"}}>DELETE PARTY</button>
                        </EditDelete>

                        <PartyContainer>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/streamers/${this.state.id}`}><button className='watchButton'>WATCH</button></Link> :
                            <Link to={`/streamers/${this.state.id}`}><button className='watchButton'>WATCH</button></Link>}
                        </PartyContainer>

                        <PartyContainer>
                        {this.state.userLogged ? <button className='normalButton' onClick={(e) => this._addToFavorites(e)}>ADD TO FAVORITES</button> : null}
                        </PartyContainer>
                        
                        <PartyContainer>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/parties`}><button className="normalButton">GO BACK</button></Link> :
                            <Link to={`/parties`}><button className="normalButton">GO BACK</button></Link>}
                        </PartyContainer>
                    </PartyWrapper>
                </div>
            );
        }
    }
}

export default Party;