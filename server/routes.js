const config = require("./config.json");
const mysql = require("mysql");
const express = require("express");
var qs = require("querystring");
var opencage = require("opencage-api-client")

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db,
});
connection.connect();

async function authenticateUser(req, res) {
    const username = req.params.username;

    connection.query(
        `
        SELECT username, password
        FROM User
        WHERE username = '${username}'
        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    )
}

async function getUserInfo(req, res) {
    const username = req.params.username;
    connection.query(
        `
        SELECT about
        FROM User
        WHERE username = '${username}'`,
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    );
}

async function getFriends(req, res) {
    const username = req.params.username;

    connection.query(
        `
        WITH FriendsWith AS (
            SELECT requester as friend
            FROM Friends
            WHERE requested = '${username}' AND confirmed = true
        ),
        FriendTo AS (
            SELECT requested as friend
            FROM Friends
            WHERE requester = '${username}' AND confirmed = true
        )
        SELECT friend FROM FriendsWith UNION SELECT friend FROM FriendTo
        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    )
}

async function getTrips(req, res) {
    const username = req.params.username;
    connection.query(
        `
        SELECT city_name, latitude, longitude, start_date, end_date
        FROM City
        WHERE username = '${username}'
        `,
        function (error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    );
}

async function getPlaces(req, res) {
    const username = req.params.username;
    const city_name = req.params.city;

    connection.query(
        `
        SELECT place_name, description, latitude, longitude
        FROM Place
        WHERE username = '${username}' AND city_name = '${city_name}'
        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    );
}

async function getFriendRequests(req, res) {
    const username = req.params.username;

    connection.query(
        `
        SELECT requester
        FROM Friends
        WHERE requested = '${username}' AND confirmed = false
        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (results) {
                res.json({ results: results });
            }
        }
    )
}

async function addTrip(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        opencage
            .geocode(
                {
                    key: process.env.REACT_APP_GEOCODING_API_KEY,
                    limit: 1,
                    q: data.city
                }
            )
            .then(response => {
                data.lat = response.results[0].geometry.lat;
                data.long = response.results[0].geometry.lng;
                connection.query(
                    `
                    INSERT INTO City
                    VALUES ('${data.username}', '${data.city}', ${data.lat}, ${data.long}, '${data.start_date}', '${data.end_date}')
                    `,
                    function (error, results, fields) {
                        if (error) {
                            console.log(error);
                            res.status(400).send({ message: "Unable to add trip. May be a duplicate trip, or try a more specific search" });
                        } else {
                            res.status(200).send({ message: "Trip Added!" });
                        }
                    }
                );
            })
            .catch(err => {
                console.log(err);
            });
    });
}

async function addPlace(req, res) {
    var body = '';
    var bounds = ''
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        opencage
            .geocode(
                {
                    key: process.env.REACT_APP_GEOCODING_API_KEY,
                    limit: 1,
                    q: data.city,
                }
            )
            .then(tResponse => {
                let minLng = parseFloat(tResponse.results[0].geometry.lng) - 5;
                bounds += minLng.toString() + ',';
                let minLat = parseFloat(tResponse.results[0].geometry.lat) - 5;
                bounds += minLat.toString() + ',';
                let maxLng= parseFloat(tResponse.results[0].geometry.lng) + 5;
                bounds += maxLng.toString() + ',';
                let maxLat = parseFloat(tResponse.results[0].geometry.lat) + 5;
                bounds += maxLat.toString();
                opencage
                    .geocode(
                    {
                        key: process.env.REACT_APP_GEOCODING_API_KEY,
                        limit: 1,
                        q: data.name,
                        bounds: bounds
                    }
                ).then(dResponse => {
                    data.lat = dResponse.results[0].geometry.lat;
                    data.long = dResponse.results[0].geometry.lng;
                    connection.query(
                        `
                        INSERT INTO Place
                        VALUES ('${data.username}', '${data.city}', '${data.name}', '${data.description}', '${data.lat}', '${data.long}')

                        `,
                        function(error, results, fields) {
                            if (error) {
                                console.log(error);
                                res.json({ error: error });
                            } else if (results) {
                                res.json({ results: results });
                            }
                        }
                    )
                }).
                catch(err => {
                    console.log(err);
                    res.json({ error: error });
                })
            })
            .catch(err => {
                console.log(err);
                res.json({ error: error });
            });
    });
}

async function addUser(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            INSERT INTO User
            VALUES ('${data.username}', '${data.bio}', '${data.password}')
            `,
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Username is taken" });
                } else {
                    res.status(200).send({ message: "User Added!" });
                }
            }
        );
    });
}

async function sendFriendRequest(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
        `
        INSERT INTO Friends
        VALUES ('${data.requester}', '${data.requested}', false)

        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Send friend request failed" });
            } else {
                res.status(200).send({ message: "Friend request sent"});
            }
        });
    });
}

async function confirmFriendRequest(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
        `
        UPDATE Friends
        SET confirmed = true
        WHERE requester = '${data.requester}' AND requested = '${data.requested}'

        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Failed to confirm friend request" });
            } else {
                res.status(200).send({ message: "Friend request confirmed"});
            }
        });
    });
}

async function denyFriendRequest(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
        `
        DELETE FROM Friends
        WHERE requester = '${data.requester}' AND requested = '${data.requested}'

        `,
        function(error, results, fields) {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Deny friend request failed" });
            } else {
                res.status(200).send({ message: "Friend request denied"});
            }
        });
    });
}

module.exports = {
    authenticateUser,
    getUserInfo,
    getFriends,
    getTrips,
    getPlaces,
    getFriendRequests,
    addTrip,
    addPlace,
    addUser,
    sendFriendRequest,
    confirmFriendRequest,
    denyFriendRequest
};
