const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamerSchema = Schema({
    userName: String,
    profileImage: String,
    bio: String,
    linkToStream: String,
});

const partySchema = Schema({
    partyName: String,
    bannerImage: String,
    description: String,
    games: [],
    streamers: [streamerSchema]
});

const userSchema = Schema({
    userName: String,
    firstName: String,
    lastName: String,
    bio: String,
    savedParties: []
});

const streamerModel = mongoose.model('Streamer', streamerSchema);
const partyModel = mongoose.model('Party', partySchema);
const userModel = mongoose.model('Streamer', userSchema);

module.exports = {
    streamerModel, partyModel, userModel
};