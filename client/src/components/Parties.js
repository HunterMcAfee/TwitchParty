import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Link } from "react-router-dom"

const PartyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 50px;
    }
`;

const PartyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

const PartyStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    width: 600px;
    padding-left: 20px;
    padding-right: 10px;
    background-color: #1a1a1a;
    border-radius: 10px;
    border: 5px solid #1a1a1a;
    img {
        height: 100px;
        width: 300px;
        border-radius: 10px;
        border: 2px solid #1a1a1a;
    }
`;

const PartyName = styled.div`
    color: white;
    height: 100px;
    width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

class Parties extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            userLogged: false,
            parties: []
        }
    }

    componentWillMount() {
        axios.get("/api/party").then( (res) => {
            this.setState({ parties: res.data });
        }).catch( (error) => {
            console.log(error);
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
            <PartyWrapper>
                <PartyContainer>
                <h1>Parties</h1>
                </PartyContainer>
                <PartyContainer>
                {this.state.userLogged ? <Link to={`/${this.state.user._id}/createParty`}><button className='normalButton'>CREATE A PARTY</button></Link> :
                    <Link to='/createParty'><button className='normalButton'>CREATE A PARTY</button></Link>} 
                </PartyContainer> 
                
                {this.state.parties.map( (party, i) => {
                    return (
                        <PartyContainer>
                        <PartyStyle key={i}>
                        <PartyName>{party.partyName}</PartyName>
                        <img src={party.bannerImage} alt='' />
                        {this.state.userLogged ? <a href={`/${this.state.user._id}/party/${party._id}`}><button className='partyButton'>GO TO</button></a> : 
                            <a href={`/party/${party._id}`}><button className='partyButton'>GO TO</button></a>}
                        </PartyStyle>
                        </PartyContainer>
                    )
                })}
                <br />
    
                <PartyContainer>
                {this.state.userLogged ? <Link to={`/user/${this.state.user._id}`}><button className='normalButton'>GO BACK TO PROFILE</button></Link> : null}
                </PartyContainer>
            </PartyWrapper>
        );
    }
}

export default Parties;