require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connection(process.env.MONGODB_URI);

const Streamer = require('../models/streamer');
const Party = require('../models/party');
const User = require('../models/user');

mongoose.Promise = global.Promise;

Streamer.remove({}, (err) => console.log(err));
Party.remove({}, (err) => console.log(err));
User.remove({}, (err) => console.log(err));



mongoose.connection.close();