'use strict';
const express = require('express');
const router = express.Router();
const StationModel = require('../models/stationModel');
const SNOTEL = require('../snotel_library/snotelLibrary');

router.get('/', function(req, res){
    //Get all stations from our DB
    StationModel.
    find(function(err, users){
        res.status(200).send(users);
    });
});

router.get('/:id', function(req, res){
    //get one station from our DB
    StationModel.
    find().
    where('triplet').
    equals(req.params.id).
    exec(function(err, station) {
        if (err) {
             res.status(500).send(err);
         }else{
            res.status(200).send(station);
        }
    })
});

//**********************************************************************************************
// Use this route to update stations.  Stations currently come from a hardcoded list found here:
// https://github.com/bobbymarko/powderlines-api/blob/master/config/stations.yml
// POST is commented out until I can get auth in place w/ admin privelages
//**********************************************************************************************

router.post('/', function(req, res) {

    // Still designed for Mongo.  Need to convert this to 
    // Psql and should do so with Ruby

    const newStation = new StationModel(req.body);
 
    newStation
    .save(function(err) { 
        if (err){
            res.status(500).send("Something went wrong while attempting to POST to the Database"); 
        } else{
            res.status(200).send("POST Succesful");
        }
    });

});

module.exports = router;