const config = require("./config.json");
//const mysql = require("mysql");
const express = require("express");

// create connection


async function getUserInfo(req, res) {
    res.json({
        results: [
            {
                username: "Mike",
                bio: "I'm Mike",
                profile_pic: "reference to profile pic"
            }
        ]
    })
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
    res.json({
        results: [
            {
                photo: "Portland Photo",
                city: "Portland",
                latitude: 43.6591,
                longitude: 70.2568,
                review: "Went to Portland",
                start_date: "2022-08-18",
                end_date: "2022-08-26"
            },
            {
                photo: "New Orleans Photo",
                city: "New Orleans",
                latitude: 29.9511,
                longitude: 90.0715,
                review: "Went to New Orleans",
                start_date: "2022-03-09",
                end_date: "2022-03-13"
            },
            {
                photo: "Austin Photo",
                city: "Austin",
                latitude: 30.2672,
                longitude: 97.7431,
                review: "Went to Austin",
                start_date: "2022-03-06",
                end_date: "2022-03-09"
            }
        ]
    })
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

module.exports = {
    getUserInfo,
    getFriends,
    getTrips,
    getPlaces,
};
