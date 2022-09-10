import React, { useState, useEffect } from 'react';

import { getUserInfo, getTrips } from '../fetcher.js';

import Map from '../components/Map'

export default function UserPage() {
    const [userInfo, setUserInfo] = useState({ username: "Mike", bio: "I'm Mike", profile_pic: "Photo" });
    const [markers, setMarkers] = useState([]);
    const [activeLocation, setActiveLocation] = useState(null);

    /*
    *  Query for user's info and trips
    *  Display user's profile pic + bio at top of page
    *  Display each trip as a marker on the map
    *
    *  Add trip button -> add trip sidebar or page
    */

    useEffect(() => {
        getTrips(userInfo.username).then(res => {
            res.results.map((i) => {
                i.data = { city: i.city, photo: i.photo, start_date: i.start_date, end_date: i.end_date, review: i.review };
                i.position = [i.latitude, i.longitude];
                i.content = <> {i.photo} <br /> <b> {i.city} </b> <br /> {i.start_date} - {i.end_date} <br /> {i.review} </>;
            });
            setMarkers(res.results.map((i) => { return { position: i.position, content: i.content, data: i.data } }));
        }, []);
    })

    //useEffect(() => console.log(JSON.stringify(activeLocation)), [activeLocation]);

    function TripSummary({ location }) {
        return (
            <div className="card">
                <h2>{location.city}</h2>
                <p><i>{location.start_date} to {location.end_date}</i></p>
                {/* <img src="https://i.imgur.com/K9HVAGHl.jpg" alt={location.city} /> */}
                <p>{location.review}</p>
            </div>

        )
    }

    return (
        <>
            <h1> {userInfo.username} </h1>
            <Map markers={markers} clickFn={setActiveLocation} />
            {(activeLocation == null)
                ? <h3>Select a destination from the map.</h3>
                : <TripSummary location={activeLocation} />}

        </>
    )
}

