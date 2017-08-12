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

router.put('/', (req, res) => {
    Party.findByIdAndUpdate(req.body._id, req.body).then( (party) => {
            console.log('Saved edits');
        })
        .catch( (err) => {
            console.log(err);
        })
});

router.get('/delete/:partyId', (req, res) => {
    Party.findByIdAndRemove(req.params.partyId).then( (party) => {
            console.log(`${party.partyName} was deleted`)
        })
        .catch( (err) => {
            console.log(err);
        })
});

module.exports = router;