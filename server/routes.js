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

async function searchCity(req, res) {
    const city = req.params.city;

    opencage
        .geocode(
            {
                key: process.env.REACT_APP_GEOCODING_API_KEY,
                limit: 10,
                q: city
            }
        ).then(response => {
            response.results.map(i => {
                i.display = i.formatted;
                i.lat = i.geometry.lat;
                i.long = i.geometry.lng;
                i.city = i.components.city ? i.components.city : city;
            })
            res.json({ results: response.results })
        })
}

async function searchPlace(req, res) {
    const place = req.params.place;
    const bounds = req.params.bounds;

    opencage
        .geocode(
            {
                key: process.env.REACT_APP_GEOCODING_API_KEY,
                limit: 10,
                q: place,
                bounds: bounds
            }
        ).then(response => {
            response.results.map(i => {
                i.display = i.formatted;
                i.lat = i.geometry.lat;
                i.long = i.geometry.lng;
                i.place = i.formatted.split(",")[0]
            })
            res.json({ results: response.results })
        })
}

async function addTrip(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
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
    });
}

async function addPlace(req, res) {
    var body = ''
    var bounds = ''
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            INSERT INTO Place
            VALUES ('${data.username}', '${data.city}', '${data.name}', '${data.description}', '${data.lat}', '${data.long}')

            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Unable to add place" });
                } else if (results) {
                    res.status(200).send({ message: "Place added!" });
                }
            }
        );
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
            VALUES ('${data.username}', '${data.bio}', '${data.password}', false)
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
                res.status(400).send({ message: "Friend request has already been sent" });
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

async function removeFriend(req, res) {
    var body = ''
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            DELETE FROM Friends
            WHERE ((requester = '${data.user}' AND requested = '${data.friend}') OR
                   (requester = '${data.friend}' AND requested = '${data.user}'))
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Remove friend failed" })
                } else {
                    res.status(200).send({ message: "Friend removed" })
                }
            });
    });
}

async function changePassword(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            UPDATE User
            SET password = '${data.new_password}'
            WHERE username = '${data.username}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Unable to change password" })
                } else {
                    res.status(200).send({ message: "Password updated!" })
                }
            });
    });
}

async function updateTrip(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            UPDATE City
            SET start_date = '${data.start_date}'
            WHERE username = '${data.username}' AND city_name = '${data.city}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Update failed" })
                } else {
                    res.status(200).send({ message: "Dates updated!" })
                }
            });
    });
}

async function deleteTrip(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            DELETE FROM Place
            WHERE username = '${data.username}' AND city_name = '${data.city}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });
        connection.query(
            `
            DELETE FROM City
            WHERE username = '${data.username}' AND city_name = '${data.city}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Unable to delete trip" });
                } else {
                    res.status(200).send({ message: "Trip deleted!" });
                }
            });
    });
}

async function updatePlace(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            UPDATE Place
            SET description = '${data.description}'
            WHERE username = '${data.username}' AND city_name = '${data.city}' AND place_name = '${data.place}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Update failed" })
                } else {
                    res.status(200).send({ message: "Dates updated!" })
                }
            });
    });
}

async function deletePlace(req, res) {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        var data = JSON.parse(body);
        connection.query(
            `
            DELETE FROM Place
            WHERE username = '${data.username}' AND city_name = '${data.city}' AND place_name = '${data.place}'
            `,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send({ message: "Unable to delete trip" })
                } else {
                    res.status(200).send({ message: "Trip deleted!" })
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
    denyFriendRequest,
    removeFriend,
    changePassword,
    searchCity,
    searchPlace,
    updateTrip,
    deleteTrip,
    updatePlace,
    deletePlace
};
