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

router.post('/', (req, res) => {
    const newParty = new Party();
    console.log(req.body)
    newParty.partyName = req.body.partyName
    newParty.bannerImage = req.body.bannerImage
    newParty.description = req.body.description

    const newStreamers = req.body.streamers.map( (streamer) => {
        return new Streamer(streamer);
    })

    newParty.streamers = newStreamers;

    newParty.save().then( (party) => {
        res.json(party);
    }).catch( (err) => {
        console.log(err);
    })
})


module.exports = router;