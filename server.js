'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const stationData = require('./server/routes/stationData');
const station = require('./server/routes/station');
// const mongoose = require('mongoose');
// const mongoDB = 'mongodb://localhost/Sunshine-Daydream-DB';
const db  = require('./db');


//use to prevent cors issues for development
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mongoose.connect(mongoDB, { useNewUrlParser: true });

// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'builds')));

// Routes
app.use('/station', station);
app.use('/station-data', stationData);

// Send all other requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'builds'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));