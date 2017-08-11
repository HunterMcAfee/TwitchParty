import React, { Component } from 'react';

const StreamersForm = props => {
    return(
        <div>
            <input onChange={e => props._handleStreamerChange(e, props.index)} index={props.index} value={props.streamer.userName} name='userName' type='text' placeholder='User Name' />
            <input onChange={e => props._handleStreamerChange(e, props.index)} index={props.index} value={props.streamer.profileImage} name='profileImage' type='text' placeholder='Profile Image' />
            <input onChange={e => props._handleStreamerChange(e, props.index)} index={props.index} value={props.streamer.bio} name='bio' type='text' placeholder='Bio' />
            <input onChange={e => props._handleStreamerChange(e, props.index)} index={props.index} value={props.streamer.linkToStream} name='linkToStream' type='text' placeholder='Link To Stream' />
        </div>
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

    _handlePartyChange = (event) => {
        const attributeName = event.target.name;
        const attibuteValue = event.target.value;

        const updateParty = {...this.state}
        updateParty[attributeName] = attibuteValue;
        this.setState(updateParty)
    }

    _handleStreamerChange = (event, index) => {
        const attributeName = event.target.name;
        const attributeValue= event.target.value;

        const newState = {...this.state};
      
        newState.streamers[index][attributeName] = attributeValue;
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <form>
                <input onChange={this._handlePartyChange} type='text' name='partyName' value={this.state.partyName} placeholder='Party Name' />
                <br />
                <input onChange={this._handlePartyChange} type='text' name='bannerImage' value={this.state.bannerImage} placeholder='Banner Image' />
                <br />
                <input onChange={this._handlePartyChange} type='text' name ='description' value={this.state.description} placeholder='Description' />
                {this.state.streamers.map( (streamer, i) => {
                    return (<StreamersForm _handleStreamerChange={this._handleStreamerChange} key={i} index={i} streamer={streamer} />)
                })}                
                </form>
            </div>
        );
    }
}

export default CreateParty;