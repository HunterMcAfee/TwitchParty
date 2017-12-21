import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"

const PartyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-around;
    flex-wrap: wrap;
    margin-bottom: 20px;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 50px;
        padding-top: 25px;
        padding-bottom: 25px;
        margin-bottom: 0px;
        background-color: #1a1a1a;
        color: white;
        width: 800px;
        text-align: center;
    }
    img {
        height: 600px;
        width: 800px;
    }
`;

const PartyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Information = styled.div`
    font-weight: bold;
    font-size: 14;
    background-color: #1a1a1a;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 800px;
    text-align: center;
`;

const Buttons = styled.div`
    margin: 10px;
`;

class Party extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
            redirect: false,
            party: {
                streamers: []
            }
        }
    }

    componentWillMount() {
        this._fetchParty();
        this._fetchUser();
    }

    _fetchParty = async () => {
        const id = this.props.match.params.partyId;
        try {
            const res = await axios.get(`/api/party/${id}`);
            this.setState({party: res.data})
        }
        catch (err) {
            console.log(err);
        }
    }

    _fetchUser = () => {
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
        const payload = {
            favoriteParty: this.state.party,
            userId: this.state.user._id
        }
        axios.post('/api/user/favoriteParty', payload)
            .then( (res) => {
                console.log('Sent favorite party info');
            })
            .catch( (err) => {
                console.log(err);
            })
        alert(`${this.state.party.partyName} party was added to your favorites list!`);
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
                        <h1>{this.state.party.partyName}</h1>
                        </PartyContainer>

                        <PartyContainer>
                        <img src={this.state.party.bannerImage} alt=''></img>
                        </PartyContainer>

                        <PartyContainer>
                        <Information>{this.state.party.description}</Information>
                        </PartyContainer>
                        
                        <PartyContainer>
                        <Information>STREAMERS: {this.state.party.streamers.map((streamer, i) => {
                            return (
                                <div key={i}>{streamer.userName}</div>
                            )
                        })}</Information>
                        </PartyContainer>

                        <Buttons>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/edit/${this.state.party._id}`}><button className="normalButton">EDIT PARTY</button></Link> :
                            <Link to={`/edit/${this.state.party._id}`}><button className="normalButton">EDIT PARTY</button></Link>}
                        </Buttons>

                        <Buttons>
                        <button className='normalButton' onClick={(e) => this._handleDelete(e, this.state.party._id)}>DELETE PARTY</button>
                        </Buttons>

                        <Buttons>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/streamers/${this.state.party._id}`}><button className='watchButton'>WATCH</button></Link> :
                            <Link to={`/streamers/${this.state.party._id}`}><button className='watchButton'>WATCH</button></Link>}
                        </Buttons>

                        <Buttons>
                        {this.state.userLogged ? <button className='normalButton' onClick={(e) => this._addToFavorites(e)}>ADD TO FAVORITES</button> : null}
                        </Buttons>
                        
                        <Buttons>
                        {this.state.userLogged ? <Link to={`/${this.state.user._id}/parties`}><button className="normalButton">GO BACK</button></Link> :
                            <Link to={`/parties`}><button className="normalButton">GO BACK</button></Link>}
                        </Buttons>
                    </PartyWrapper>
                </div>
            );
        }
    }
}

export default Party;