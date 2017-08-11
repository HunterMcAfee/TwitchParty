import React, { Component } from 'react';

const StreamersForm = props => {
    return(
        <form>
            <input value={props.streamer.userName} name='userName' type='text' placeholder='User Name' />
            <input value={props.streamer.profileImage} name='profileImage' type='text' placeholder='Profile Image' />
            <input value={props.streamer.bio} name='bio' type='text' placeholder='Bio' />
            <input value={props.streamer.linkToStream} name='linkToStream' type='text' placeholder='Link To Stream' />
        </form>
    )
}
class CreateParty extends Component {
    constructor() {
        super();
        this.state = {
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
    render() {
        return (
            <div>
                <form>
                <input type='text' value={this.state.partyName} placeholder='Party Name' />
                <br />
                <input type='text' value={this.state.bannerImage} placeholder='Banner Image' />
                <br />
                <input type='text' value={this.state.description} placeholder='Description' />
                {this.state.streamers.map( (streamer, i) => {
                    return (<StreamersForm key={i} streamer={streamer} />)
                })}                
                </form>
            </div>
        );
    }
}

export default CreateParty;