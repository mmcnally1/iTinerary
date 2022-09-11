import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip } from '../fetcher.js';
import PlaceAdder from './PlaceAdder.js';

export default function TripAdder({ username, displayMarkers, location, setLocation }) {

    const [startedTrip, setStartedTrip] = useState(false);
    const [city, setCity] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [coords, setCoords] = useState([]);
    const [places, setPlaces] = useState([]);


    // get from sessionStorage
    const onFinish = (values) => {
        values.username = username;
        postTrip(values).then(() => {
            displayMarkers();
        });

    }

    const handleTrip = () => {
        if (location === [] || city === '' || start === '' || end === '') {
            alert("Please fill all fields and place a marker on the map.")
            return
        }
        let trip = new Object()
        trip.id = crypto.randomUUID()

        let data = new Object()
        data.location = location
        data.city = city
        data.start = start
        data.end = end
        data.places = places

        trip.data = data

        sessionStorage.setItem("trip", JSON.stringify(trip))

        setStartedTrip(true)
    }

    function TripSection() {
        let loc = [location && location.lat.toFixed(3), location && location.lng.toFixed(3)]
        return (<>
            Location [{loc[0]}, {loc[1]}]
            <br />
            <label>
                City <br />
                <input type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required />
            </label>
            <br />
            <label>
                Start Date <br />
                <input type="date"
                    value={start}
                    placeholder="YYYY-mm-dd"
                    onChange={e => setStart(e.target.value)}
                    required />
            </label>
            <br />
            <label>
                End Date <br />
                <input type="date"
                    value={end}
                    placeholder="YYYY-mm-dd"
                    onChange={e => setEnd(e.target.value)}
                    required />
            </label>
            <br />
            <button onClick={handleTrip}>Add Points of Interest</button>
        </>)

    }

    return (
        <form onSubmit={onFinish}>
            {/* <TripSection /> */}
            {/* <PlaceAdder location={location} setLocation={setLocation} /> */}
            {!startedTrip
                ? <TripSection />
                : <PlaceAdder
                    location={location}
                    setLocation={setLocation}
                    places={places}
                    setPlaces={setPlaces} />
            }
            <input type="submit" value="Complete This Trip" disabled={places.length === 0} />
        </form>


    );
}
