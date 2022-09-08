const express = require('express');
//const mysql = require('mysql');
var cors = require('cors');

const routes = require('./routes');
const config = require('./config.json');

const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1: Get User's profile pic/bio

// Route 2: Get User's friends + number of trips for each friend

// Route 3: Get User's trips

// Route 4: Get places visited given User, City


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
})
module.exports = app;
