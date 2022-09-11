import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { postTrip } from '../fetcher.js';
import PlaceAdder from './PlaceAdder.js';

export default function TripAdder({ username, displayMarkers, location, setLocation }) {

    const [startedTrip, setStartedTrip] = useState(false);
    const [city, setCity] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [coords, setCoords] = useState(null);

    const onFinish = (values) => {
        values.username = username;
        postTrip(values).then(() => {
            displayMarkers();
        });

    }

    function TripSection() {
        return (<>
            Location [{location && location.lat.toFixed(3)}, {location && location.lng.toFixed(3)}]
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
            <button onClick={() => { setStartedTrip(true), setCoords(location) }}>Add Points of Interest</button>
        </>)

    }

    return (
        <form onSubmit={onFinish}>
            <TripSection />
            <PlaceAdder location={location} setLocation={setLocation} />
            {/* {!startedTrip */}
            {/*     ? <TripSection /> */}
            {/*     : <PlaceAdder location={location} setLocation={setLocation} /> */}
            {/* } */}
            <input type="submit" value="Add Trip" />
        </form>


    );
}
