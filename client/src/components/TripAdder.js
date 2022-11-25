import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table } from 'antd';
import DatePicker from 'react-datepicker';

import { postTrip, postPlace, searchCity } from '../fetcher.js';
import PlaceAdder from './PlaceAdder.js';
import 'react-datepicker/dist/react-datepicker.css';

export default function TripAdder({ username, displayMarkers, location, setLocation }) {

    const [startedTrip, setStartedTrip] = useState(false);
    const [city, setCity] = useState('');
    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [places, setPlaces] = useState([])
    const [cities, setCities] = useState([]);
    const [bounds, setBounds] = useState("");

    const citiesTableColumns = [
        {
            dataIndex: 'display',
            key: 'display',
        },
        {
            dataIndex: 'lat',
            key: 'lat',
        },
        {
            dataIndex: 'long',
            key: 'long'
        },
        {
            dataIndex: 'city',
            key: 'city',
            render: (_, row) => (
                <Button
                    type="default"
                    onClick={() => {
                        setCity(row.city);
                        setLat(row.lat);
                        setLng(row.long);
                        setCities([]);
                    }}
                >
                    Select City
                </Button>
            )
        }
    ]

    const handleBounds = () => {
        let boundsStr = ""
        let minLng = lng - 5;
        boundsStr += minLng.toString() + ',';
        let minLat = lat - 5;
        boundsStr += minLat.toString() + ',';
        let maxLng= lng + 5;
        boundsStr += maxLng.toString() + ',';
        let maxLat = lat + 5;
        boundsStr += maxLat.toString();
        setBounds(boundsStr);
    }

    const cityOnClick = (e) => {
        e.preventDefault();

        searchCity(city).then(res => {
            setCities(res.results);
        })
    }

    const onFinish = (e) => {
        e.preventDefault();
        let values = JSON.parse(sessionStorage.getItem('trip'));
        values.username = username;
        let tripValues = new Object();
        tripValues.username = values.username;
        tripValues.city = values.data.city;
        tripValues.lat = values.data.lat;
        tripValues.long = values.data.long;
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

        postTrip(tripValues).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    displayMarkers();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
        setStartedTrip(false);
        setCity('');
        setStart(new Date());
        setEnd(new Date());
        setPlaces([]);
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
        data.lat = lat;
        data.long = lng;
        data.start = start.toJSON().slice(0,10);
        data.end = end.toJSON().slice(0,10);
        data.places = places;

        trip.data = data;

        sessionStorage.setItem("trip", JSON.stringify(trip));
        handleBounds();
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
            <button onClick={cityOnClick}>Search City</button>
            {cities.length > 0 ?
            <Table
                dataSource={cities}
                columns={citiesTableColumns}
                bordered={true}
                expandable={true}
                pagination={false}
                size='small'
                /> : <br />}
            <br />
            <label>
                Start Date <br />
                <DatePicker
                    selected={start}
                    onChange={(date) => {
                        setStart(date);
                        }
                    }
                    popperPlacement="right"
                    required
                />
            </label>
            <br />
            <label>
                End Date <br />
                <DatePicker
                    selected={end}
                    onChange={(date) => {
                        setEnd(date);
                        }
                    }
                    popperPlacement="right"
                    required
                />
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
                    setPlaces={setPlaces}
                    bounds={bounds} />
            }
            <input type="submit" value="Complete This Trip" disabled={places.length === 0} />
        </form>
    );
}
