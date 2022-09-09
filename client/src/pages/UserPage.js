import React, { useState, useEffect } from 'react';

import { getUserInfo, getTrips } from '../fetcher.js';

import Map from '../components/Map'

export default function UserPage() {
    const [userInfo, setUserInfo] = useState({});
    const [markers, setMarkers] = useState([]);

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

    useEffect(() => {
        getTrips("Mike").then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.start_date = i.start_date.slice(0, 10);
                i.end_date = i.end_date.slice(0,10);
                i.content = <> {i.photo} <br /> <b> {i.city_name} </b> <br /> {i.start_date} - {i.end_date} <br /> {i.review} </>;
            });
            setMarkers(res.results.map((i) => {return {position: i.position, content: i.content}}));
        })
    }, []);

    return (
      <>
        <div>
            <h1> {userInfo.username} </h1>
        </div>
        <div>
            <Map center={[0, 0]} zoom={1} markers={markers} />
        </div>
      </>
    )
}
