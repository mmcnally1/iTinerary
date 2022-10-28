const express = require('express');
const path = require("path");
var cors = require('cors');

const routes = require('./routes');
const config = require('./config.json');

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get('/login/:username/:password', routes.authenticateUser);

// Route 1: Get User's profile pic/bio
app.get('/userInfo/:username', routes.getUserInfo);

// Route 2: Get User's friends + number of trips for each friend
app.get('/friends/:username', routes.getFriends);

// Route 3: Get User's trips
app.get('/trips/:username', routes.getTrips);

// Route 4: Get places visited given User, City
app.get('/places/:username/:city', routes.getPlaces);

app.get('/getFriendRequests/:username', routes.getFriendRequests);

// Route 5: Add trip to database
app.post('/addTrip', routes.addTrip);

app.post('/addPlace', routes.addPlace);

app.post('/addUser', routes.addUser);

app.post('/sendFriendRequest', routes.sendFriendRequest);

app.post('/confirmFriendRequest', routes.confirmFriendRequest);

app.post('/denyFriendRequest', routes.denyFriendRequest);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://mm-itinerary.herokuapp.com:${process.env.PORT}/`);
})
module.exports = app;
