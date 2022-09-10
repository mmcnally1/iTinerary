const config = require("./config.json");
const mysql = require("mysql");
const express = require("express");
var qs = require("querystring");

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db,
});
connection.connect();

async function getUserInfo(req, res) {
    const username = req.params.username;
    connection.query(
        `
        SELECT username, profile_pic, about
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
    res.json({
        results: [
            {
                username: "Joe",
                profile_pic: "Joe's profile pic",
                num_trips: 5
            },
            {
                username: "Adam",
                profile_pic: "Adam's profile pic",
                num_trips: 3
            },
            {
                username: "Natalie",
                profile_pic: "Natalie's profile pic",
                num_trips: 7
            }
        ]
    })
}

async function getTrips(req, res) {
    const username = req.params.username;
    connection.query(
        `
        SELECT city_name, latitude, longitude, photo, start_date, end_date
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
    res.json({
        results: [
            {
                photo: "Portland Paddle photo",
                city: "Portland",
                place: "Portland Paddle",
                review: "Kayaked",
                date: "2022-08-25"
            },
            {
                photo: "Food Photo",
                city: "Portland",
                place: "Duckfat",
                review: "food was good",
                date: "2022-08-26"
            }
        ]
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
            VALUES ('${data.username}', '${data.city}', '${data.photo}', ${data.lat}, ${data.long}, '${data.start_date}', '${data.end_date}')
            `,
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.json({ error: error });
                } else {
                    res.status(200).json("Trip Added!");
                }
            }
        );
    });
}

module.exports = {
    getUserInfo,
    getFriends,
    getTrips,
    getPlaces,
    addTrip
};
