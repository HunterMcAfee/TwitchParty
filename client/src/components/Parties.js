import React, { Component } from 'react';
import axios from 'axios';

class Parties extends Component {
    constructor() {
        super();
        this.state = {
            parties: []
        }
    }

    componentWillMount() {
        axios.get("/api/party").then( (res) => {
            this.setState({ parties: res.data });
        }).catch( (err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <h1>Parties</h1>

            </div>
        );
    }
}

export default Parties;