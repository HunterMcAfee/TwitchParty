import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom"
import styled from 'styled-components';

const PartyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-top: 20px;
    font-size: 18px;
    
`;

const PartyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
    h1 {
        font-family: 'Press Start 2P', cursive;
        margin-bottom: 0px;
    }
`;

const StreamersForm = props => {
    return (
        <div>
            <input onChange={e => props._handleStreamerChange(e, props.index)}
                index={props.index}
                value={props.streamer.userName}
                name='userName' type='text'
                placeholder='User Name' />
            <input onChange={e => props._handleStreamerChange(e, props.index)}
                index={props.index}
                value={props.streamer.profileImage}
                name='profileImage'
                type='text'
                placeholder='Profile Image' />
            <input onChange={e => props._handleStreamerChange(e, props.index)}
                index={props.index}
                value={props.streamer.bio}
                name='bio' type='text'
                placeholder='Bio' />
            <input onChange={e => props._handleStreamerChange(e, props.index)}
                index={props.index}
                value={props.streamer.linkToStream}
                name='linkToStream'
                type='text'
                placeholder='Link To Stream' />
            <br />
            <br />
        </div>
    )
}
class EditParty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
            redirect: false,
            party: {
                _id: '',
                partyName: '',
                bannerImage: '',
                description: '',
                games: [],
                streamers: []
            }
        }
    }

    componentWillMount() {
        const id = this.props.match.params.partyId;
        axios.get(`/api/party/${id}`).then((res) => {
            console.log(res.data);
            this.setState({
                party: {
                    _id: res.data._id,
                    partyName: res.data.partyName,
                    bannerImage: res.data.bannerImage,
                    description: res.data.description,
                    games: res.data.games,
                    streamers: res.data.streamers
                }
            })
        })
            .catch((err) => {
                console.log(err);
            })
        // Get user
        if (this.props.match.params.userId) {
            this.setState({
                userLogged: true,
            })
            axios.get(`/api/user/${this.props.match.params.userId}`)
                .then((res) => {
                    this.setState({ user: res.data });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    _editParty = (e) => {
        e.preventDefault();
        axios.put('/api/party/', this.state.party)
            .then((res) => {
                console.log('Sucessfully sent edited party information');
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({ redirect: true })
    }

    _handlePartyChange = (event) => {
        const attributeName = event.target.name;
        const attibuteValue = event.target.value;

        const updateParty = { ...this.state.party }
        updateParty[attributeName] = attibuteValue;
        this.setState({ party: updateParty })
    }

    _handleStreamerChange = (event, index) => {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;

        const newState = { ...this.state.party };
        newState.streamers[index][attributeName] = attributeValue;
        this.setState({ party: newState })
    }

    render() {
        if (this.state.redirect) {
            if (this.state.userLogged) {
                return <Redirect to={`/${this.state.user._id}/party/${this.state.party._id}`} />
            } else {
                return <Redirect to={`/party/${this.state.party._id}`} />
            }
        } else {
            return (
                <PartyWrapper>
                    <PartyContainer>
                    <h1>Edit Party</h1>
                    </PartyContainer>
                    <form onSubmit={this._editParty}>
                        <PartyContainer>
                        <input onChange={this._handlePartyChange}
                            type='text'
                            name='partyName'
                            value={this.state.party.partyName}
                            placeholder='Party Name' />
                        </PartyContainer>
                        <PartyContainer>
                        <input onChange={this._handlePartyChange}
                            type='text'
                            name='bannerImage'
                            value={this.state.party.bannerImage}
                            placeholder='Banner Image' />
                        </PartyContainer>      
                        <PartyContainer>                  
                        <input onChange={this._handlePartyChange}
                            type='text'
                            name='description'
                            value={this.state.party.description}
                            placeholder='Description' />
                        </PartyContainer>
                        <br />
                        {this.state.party.streamers.map((streamer, i) => {
                            return (
                                <StreamersForm _handleStreamerChange={this._handleStreamerChange}
                                    key={i}
                                    index={i}
                                    streamer={streamer} />)
                        })}
                        <PartyContainer>
                        <button className='normalButton'>SUBMIT CHANGES</button>
                        </PartyContainer>
                    </form>
                    <PartyContainer>
                    {this.state.userLogged ? <Link to={`/${this.state.user._id}/party/${this.state.party._id}`}><button className='normalButton'>GO BACK</button></Link> :
                            <Link to={`/party/${this.state.party._id}`}><button className='normalButton'>GO BACK</button></Link>}
                    </PartyContainer>
                </PartyWrapper>
            );
        }
    }
}

export default EditParty;