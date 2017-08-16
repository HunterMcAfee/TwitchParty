import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
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
                name='userName'
                type='text'
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
                name='bio'
                type='text'
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
class CreateParty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
            redirect: false,
            party: {
                partyName: '',
                bannerImage: '',
                description: '',
                games: [],
                streamers: [
                    {
                        userName: '',
                        profileImage: '',
                        bio: '',
                        linkToStream: ''
                    },
                    {
                        userName: '',
                        profileImage: '',
                        bio: '',
                        linkToStream: ''
                    },
                    {
                        userName: '',
                        profileImage: '',
                        bio: '',
                        linkToStream: ''
                    },
                    {
                        userName: '',
                        profileImage: '',
                        bio: '',
                        linkToStream: ''
                    },
                ]
            }
        }
    }

    componentWillMount() {
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

    _createParty = (e) => {
        e.preventDefault();
        axios.post('/api/party', this.state.party)
            .then((res) => {
                console.log('Sucessfully sent new party information');
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({redirect: true});
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
        this.setState({ party: newState });
    }

    render() {
        if (this.state.redirect) {
            if (this.state.userLogged) { 
                return <Redirect to={`/${this.state.user._id}/parties`} /> 
            } else {
                 return <Redirect to={`/parties`} />
            }
        } else {
            return (
                <PartyWrapper>
                    <PartyContainer>
                    <h1>Create Party</h1>
                    </PartyContainer>
                    <PartyContainer>
                    <form onSubmit={this._createParty}>
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
                        <button className='normalButton'>CREATE PARTY</button>
                        </PartyContainer>
                    </form>
                    </PartyContainer>
                    <PartyContainer>
                    {this.state.userLogged ? <Link to={`/${this.state.user._id}/parties`}><button className='normalButton'>GO BACK</button></Link> :
                        <Link to='/parties'><button className='normalButton'>GO BACK</button></Link>}
                    </PartyContainer>
                </PartyWrapper>
            );
        }
    }
}

export default CreateParty;