require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Streamer = require('../models/streamer');
const Party = require('../models/party');
const User = require('../models/user');

mongoose.Promise = global.Promise;

Streamer.remove({}, (err) => console.log(err));
Party.remove({}, (err) => console.log(err));
User.remove({}, (err) => console.log(err));

const streamer1 = new Streamer({
    userName: 'DrDisRespectLIVE',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/drdisrespectlive-profile_image-abc1fc67d2ea1ae1-300x300.png',
    bio: 'Born with venomous gaming athleticism and a ruthless attitude to match, Dr DisRespect is an award winning international champion in the online gaming community. If you enjoy Dr DisRespect\'s high level channel, please give it a follow. Committing to the channel will change your life forever.',
    linkToStream: 'https://www.twitch.tv/drdisrespectlive'
});

const streamer2 = new Streamer({
    userName: 'summit1g',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/summit1g-profile_image-87970af8826df799-300x300.png',
    bio: 'I\'m an ex-competitive Counter-Strike player turned full time streamer. I mainly find fun in shooter games, but I also enjoy playing just about anything.',
    linkToStream: 'https://www.twitch.tv/summit1g'
});

const streamer3 = new Streamer({
    userName: 'shroud',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/shroud-profile_image-850e059aee3d6bfa-300x300.jpeg',
    bio: 'My name is Mike Grzesiek. I play CS:GO in ESEA Invite league with Cloud9 G2A under the name Shroud. I am 23, and have been playing the Counter-Strike franchise off and on for about 10 years. I\'ve mostly played 1.6 competitively, and a couple seasons of Source towards the end, before Global Offensive released.',
    linkToStream: 'https://www.twitch.tv/shroud'
});

const streamer4 = new Streamer({
    userName: 'Ninja',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ninja-profile_image-aa970b6b22d0ebbe-300x300.jpeg',
    bio: 'I am the ninja',
    linkToStream: 'https://www.twitch.tv/ninja'
});

const party1 = new Party({ 
    partyName: 'The PubStompers',
    bannerImage: 'https://static.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg',
    description: 'Here to vanquish all that come before us.',
    games: ['Player Unknown\'s Battlegrounds'],
    streamers: [streamer1, streamer2, streamer3, streamer4]
});

const streamer5 = new Streamer({
    userName: 'Stewie2K',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/40648e73774cd152-profile_image-300x300.jpeg',
    bio: 'I am 19 years old playing for Cloud 9 & I\'ve been playing since the Summer of 2014. I\'ve played CS 1.6, but only very little and never played it competitively, only played War3/KZ/Surf so I know some basics. I was born in Northern California, but I live in the C9 House right nowI\'ve graduated from school already',
    linkToStream: 'https://www.twitch.tv/stewie2k'
});

const streamer6 = new Streamer({
    userName: 'byalli',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/byalli-profile_image-9e3432a4f492b018-300x300.png',
    bio: 'I am part of the PPL(Polish Pro League)/FPL GAMES',
    linkToStream: 'https://www.twitch.tv/byalli'
});

const streamer7 = new Streamer({
    userName: 'julieCS',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/juliecs-profile_image-9cf0e2a2c4a37666-300x300.jpeg',
    bio: 'My name is Julia Kiran and I am 22 years old , I\'m from Karlshamn in Sweden, currently live there too. I\'ve played 1.6 before I started with CS:GO and been in the scene for some years, I also really love to play dota2 and HoN though its not such an active game.',
    linkToStream: 'https://www.twitch.tv/juliecs'
});

const streamer8 = new Streamer({
    userName: 'zorlaKOKA',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/zorlakoka-profile_image-b1d8197161f89463-300x300.jpeg',
    bio: '[ENG-PT] GameGear, joaovale, castanheira, jChibante, killerofgod, Fubar_Mafionso, mL_oficial, Carapas, maxiii, flexa, Najs e starzy',
    linkToStream: 'https://www.twitch.tv/zorlakoka'
});

const party2 = new Party({ 
    partyName: 'CounterStrikers',
    bannerImage: 'https://www.pexels.com/photo/automatic-weapon-bullet-camouflage-close-up-78783/',
    description: 'Here to become the best that no one ever was.',
    games: ['Counter-Strike: Global Offensive'],
    streamers: [streamer5, streamer6, streamer7, streamer8]
});

const user1 = new User({
    userName: 'JeffJaws',
    firstName: 'Jeffrey',
    lastName: 'Dawson',
    email: 'JeffJaws@gmail.com',
    bio: 'I love shooting games.',
    savedParties: []
});

const user2 = new User({
    userName: 'Mauderator',
    firstName: 'Maude',
    lastName: 'Redner',
    email: 'MRed@gmail.com',
    bio: 'I like watching people in their element.',
    savedParties: []
});

const user3 = new User({
    userName: 'TooEaseyCheesey',
    firstName: 'Richard',
    lastName: 'Cheese',
    email: 'EaseyCheese@gmail.com',
    bio: 'I am here to bring the cheese.',
    savedParties: []
});

party1.save().then( () => {
    console.log('Party 1 Saved!')
}).catch( (err) => {
    console.log(err);
})

party2.save().then( () => {
    console.log('Party 2 Saved!')
});

user1.save().then( () => {
    console.log('User 1 Saved!')
});

user2.save().then( () => {
    console.log('User 2 Saved!')
});

user3.save().then( () => {
    console.log('User 3 Saved!')
});

mongoose.connection.close();