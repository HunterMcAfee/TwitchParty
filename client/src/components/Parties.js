import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Link } from "react-router-dom"

const PartyWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    h1 {
        font-family: 'Press Start 2P', cursive;
        font-size: 50px;
        color: white;
    }
`;

const PartyContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 25px;
    h1 {
        background-color: #1a1a1a;
        width: 100%;
        text-align: center;
        padding: 25px;
        margin: 0px;
    }
`;

const PartyStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 150px;
    width: 700px;
    padding-right: 30px;
    background-color: #1a1a1a;
    img {
        height: 150px;
        width: 400px;
    }
`;

const PartyName = styled.div`
    color: white;
    height: 150px;
    width: 125px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a;
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
                        <PartyContainer key={i}>
                        <PartyStyle key={i}>
                        <img src={party.bannerImage} alt='' />
                        <PartyName>{party.partyName}</PartyName>
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