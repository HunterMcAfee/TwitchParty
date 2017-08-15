import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import Streamer from './Streamer'
import styled from 'styled-components';

const StreamersStyle = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 40px;
`;

const PartyName = styled.h2`
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    font-family: Helvetica;
`

class Streamers extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
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
        axios.get(`/api/streamer/${id}`).then((res) => {
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

    render() {
            return (
                <div>
                    {this.state.userLogged ? <Link to={`/${this.state.user._id}/party/${this.state.id}`}>Go back</Link> :
                        <Link to={`/party/${this.state.id}`}>Go back</Link>}
                    <PartyName>{this.state.partyName}</PartyName>
                    <StreamersStyle>
                    {this.state.streamers.map( (streamer, i) => {
                        return (
                            <Streamer key={i} userName={streamer.userName}
                                profileImage={streamer.profileImage}
                                bio={streamer.bio}
                                linkToStream={streamer.linkToStream} />
                        )
                    })}
                    </StreamersStyle>
                </div>
            );
        }
    }


export default Streamers;