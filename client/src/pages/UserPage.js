import React, { useState, useEffect } from 'react';

import { getUserInfo, getTrips } from '../fetcher.js';
import TripAdder from '../components/TripAdder.js';
import PlaceAdder, { LocationMarkers } from '../components/PlaceAdder.js';

import Map from '../components/Map'

export default function UserPage() {
    const [userInfo, setUserInfo] = useState({});
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
        getUserInfo("Mike").then(res => {
            setUserInfo(res.results[0]);
        })
    }, []);
    //useEffect(() => console.log(JSON.stringify(activeLocation)), [activeLocation]);

    function TripSummary({ info }) {
        return (
            <div className="card">
                <h2>{info.city}</h2>
                <p><i>{info.start_date} to {info.end_date}</i></p>
                {/* <img src="https://i.imgur.com/K9HVAGHl.jpg" alt={location.city} /> */}
                <p>{info.review}</p>
            </div>

        )
    }

    const displayMarkers = () => {
        getTrips("Mike").then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.start_date = i.start_date.slice(0, 10);
                i.end_date = i.end_date.slice(0, 10);
                i.content = <> {i.photo} <br /> <b> {i.city_name} </b> <br /> {i.start_date} - {i.end_date} <br /> {i.review} </>;
            });
            setMarkers(res.results.map((i) => { return { position: i.position, content: i.content } }));
        })
    }

    useEffect(() => {
        displayMarkers();
    }, []);

    tripProps = {
        username: userInfo.username,
        displayMarkers: displayMarkers
    }

    return (
        <>
            <h1> {userInfo.username} </h1>
            <Map markers={markers} clickFn={setActiveLocation} children={LocationMarkers} />
            {(activeLocation == null)
                ? <h3>Select a destination from the map.</h3>
                : <TripSummary info={activeLocation} />}
            <div>
                <h2>Add a Trip</h2>
                <TripAdder {...tripProps} />
                <br />
                <PlaceAdder {...tripProps} />
            </div>

        </>
    )
}
