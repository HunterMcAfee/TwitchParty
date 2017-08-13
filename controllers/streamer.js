const express = require('express');
const Party = require('../models/party');
const Streamer = require('../models/streamer');
const router = express.Router();

router.get('/:partyId', (req, res) => {
    Party.findById(req.params.partyId).then( (party) => {
        res.json(party);
    })
    .catch( (err) => {
        console.log(err);
    })
});

module.exports = router;