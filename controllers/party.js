const express = require('express');
const Party = require('../models/party');
const Streamer = require('../models/streamer');
const router = express.Router();

router.get('/', (req, res) => {
    Party.find().then( (parties) => {
        res.json(parties);
    })
    .catch( (err) => {
        console.log(err);
    })
});

router.get('/:partyId', (req, res) => {
    Party.findById(req.params.partyId).then( (party) => {
        res.json(party);
    })
    .catch( (err) => {
        console.log(err);
    })
});

module.exports = router;