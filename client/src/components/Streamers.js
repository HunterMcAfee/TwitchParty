import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"
import Streamer from './Streamer'

class Streamers extends Component {
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
    }

    render() {
            return (
                <div>
                    <h1>{this.state.partyName}</h1>
                    {this.state.streamers.map( (streamer) => {
                        return (
                            <Streamer userName={streamer.userName}
                                profileImage={streamer.profileImage}
                                bio={streamer.bio}
                                linkToStream={streamer.linkToStream} />
                        )
                    })}
                </div>
            );
        }
    }


export default Streamers;