const express = require('express');
//const mysql = require('mysql');
var cors = require('cors');
const path = require('path');

const routes = require('./routes');
const config = require('./config.json');

const app = express();

const port = process.env.PORT || config.server_port;
app.use(cors({ credentials: true, origin: [`http://localhost:${port}`] }));
app.use(express.static("public"));

app.get('/login/:username/', routes.authenticateUser);

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

app.post('/deleteFriend', routes.deleteFriend);

app.post('/changePassword', routes.changePassword);

app.get("*", (req, res, next) => {
    res.sendFile(
        path.resolve(__dirname, "./public/index.html")
    )
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
module.exports = app;
