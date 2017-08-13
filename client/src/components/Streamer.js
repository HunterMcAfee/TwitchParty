import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom"

class Streamer extends Component {
    render() {
            return (
                <div>
                    <h3>{this.props.userName}</h3>
                    <img src={this.props.profileImage} alt='' />
                    <div>{this.props.bio}</div>
                    <a href={this.props.linkToStream} target='_blank'>Stream</a>
                    <br />
                    <br />
                </div>
            );
        }
    }


export default Streamer;