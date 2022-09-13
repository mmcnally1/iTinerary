import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip, postPlace } from '../fetcher.js';
import PlaceAdder from './PlaceAdder.js';

export default function TripAdder({ username, displayMarkers, location, setLocation }) {

    const [startedTrip, setStartedTrip] = useState(false);
    const [city, setCity] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [coords, setCoords] = useState([]);
    const [places, setPlaces] = useState([])

    const onFinish = () => {
        let values = JSON.parse(sessionStorage.getItem('trip'));
        values.username = username;
        let tripValues = new Object();
        tripValues.username = values.username;
        tripValues.city = values.data.city;
        tripValues.start_date = values.data.start;
        tripValues.end_date = values.data.end;

        let tripPlaces = values.data.places;

        tripPlaces.map(place => {
            place.username = values.username;
            place.city = values.data.city;
        });

        tripPlaces.forEach(place => {
            postPlace(place);
        });

        postTrip(tripValues)
    }

    const handleTrip = () => {
        if (location === [] || city === '' || start === '' || end === '') {
            alert("Please fill all fields and place a marker on the map");
            return;
        }
        let trip = new Object();
        trip.id = crypto.randomUUID();

        let data = new Object();
        data.city = city;
        data.start = start;
        data.end = end;
        data.places = places;

        trip.data = data;

        sessionStorage.setItem("trip", JSON.stringify(trip));
        setStartedTrip(true);
    }

    function TripSection() {
        return (<>
            <h4>Click on a Marker to view a trip, or add a trip below </h4>
            <div className="trip-adder">
            <label>
                City <br />
                <input type="text"
                    key="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    autoFocus
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
            <br />
            </div>
        </>)

    }

    return (
        <form onSubmit={onFinish}>
            {!startedTrip
                ? <TripSection />
                : <PlaceAdder
                    location={city}
                    setLocation={setLocation}
                    places={places}
                    setPlaces={setPlaces} />
            }
            <input type="submit" value="Complete This Trip" disabled={places.length === 0} />
        </form>
    );
}
