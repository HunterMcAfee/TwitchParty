const express = require('express');
const Party = require('../models/party');
const Streamer = require('../models/Streamer');
const router = express.Router();

router.get('/', (req, res) => {
    Party.find().then( (parties) => {
        res.json(parties);
    })
    .catch( (err) => {
        console.log(err);
    })
});

module.exports = router;