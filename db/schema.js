const mongoose = require('mongoose');

const streamerSchema = mongoose.Schema({
    userName: String,
    profileImage: String,
    bio: String,
    linkToStream: String,
});

const partySchema = mongoose.Schema({
    partyName: String,
    bannerImage: String,
    description: String,
    games: [],
    streamers: [streamerSchema]
});

const userSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    bio: String,
    savedParties: []
});

const streamerModel = mongoose.model('Streamer', streamerSchema);
const partyModel = mongoose.model('Party', partySchema);
const userModel = mongoose.model('User', userSchema);

module.exports = {
    streamerModel, partyModel, userModel
};