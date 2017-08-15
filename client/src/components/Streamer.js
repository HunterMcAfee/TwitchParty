import React, { Component } from 'react';
import TwitchEmbed from './TwitchEmbed';
import styled from 'styled-components';

const StreamerStyle = styled.div`
    background-color: #1a1a1a;
    color: white;
    width: 500px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    font-size: 80%;
    font-family: Helvetica;
    img {
        height: 20px;
        width: 20px;
        padding-right: 10px;
    }
`;

class Streamer extends Component {
    render() {
            return (
                <StreamerStyle>
                    <h3><img src={this.props.profileImage} alt='' />{this.props.userName}</h3>
                    <TwitchEmbed channel={this.props.userName} />
                    <a href={this.props.linkToStream} target='_blank'>Watch Stream on Twitch.tv</a>
                    <div>{this.props.bio}</div>
                </StreamerStyle>
            );
        }
    }


export default Streamer;