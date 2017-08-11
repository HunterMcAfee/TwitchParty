import React, { Component } from 'react';
import axios from 'axios';
class Party extends Component {
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
        axios.get(`/api/party/${id}`).then( (res) => {
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
                Party
            </div>
        );
    }
}

export default Party;