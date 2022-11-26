import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import DatePicker from 'react-datepicker';

import { changeUsername, changePassword, getTrips, getPlaces, updateTrip, updatePlace, deleteTrip, deletePlace } from '../fetcher.js';
import NavBar from '../components/NavBar';
import TripTable from '../components/TripTable';
import PlaceTable from '../components/PlaceTable';

const bcrypt = require('bcryptjs');

export default function AccountPage() {
    const navigate = useNavigate();
    let userProfile = useParams().user;

    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));
    const [password, setPassword] = useState('');
    const [trips, setTrips] = useState([]);
    const [places, setPlaces] = useState([]);
    const [showTrips, setShowTrips] = useState(true);
    const [city, setCity] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [editTrip, setEditTrip] = useState(false);
    const [editPlace, setEditPlace] = useState(false);

    const authenticateUser = () => {
        if (activeUser != userProfile) {
            alert("You aren't authorized to access this page");
            navigate('/');
        }
    }

    const getUserTrips = () => {
        getTrips(userProfile).then(res => {
            res.results.map(i => {
                i.start_date = i.start_date.slice(0,10);
                i.end_date = i.end_date.slice(0,10);
            })
            setTrips(res.results);
        })
    };

    const getUserPlaces = (city) => {
        getPlaces(userProfile, city).then(res => {
            setPlaces(res.results);
        })
    }

    useEffect(() => {
        authenticateUser();
        getUserTrips();
    }, []);

    const updateEmail = (values) => {
        console.log(values.new_email);
    }

    const updatePassword = (values) => {
        bcrypt.hash(values.new_password, 8, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                const updateProps = {
                    username: activeUser,
                    new_password: hash
                }
                changePassword(updateProps).then((res) => {
                    res.text().then((data) => {
                        if (res.ok) {
                            console.log(JSON.parse(data).message);
                        } else {
                            alert(JSON.parse(data).message);
                        }
                    });
                });
            }
        })
    }

    const updateDate = (e) => {
        e.preventDefault();

        let data = new Object();
        data.id = crypto.randomUUID();
        data.username = userProfile;
        data.city = city;
        data.start_date = start.toJSON().slice(0,10);
        data.end_date = end.toJSON().slice(0,10);

        updateTrip(data).then(res => {
            res.text().then(resData => {
                if (res.ok) {
                    console.log(JSON.parse(resData).message);
                } else {
                    alert(JSON.parse(resData).message);
                }
                setStart(new Date());
                setEnd(new Date());
                setCity('');
                getUserTrips();
                setEditTrip(false);
            })
        })
    }

    const updateDescription = (e) => {
        e.preventDefault();

        let data = new Object();
        data.id = crypto.randomUUID();
        data.username = userProfile;
        data.city = city;
        data.place = place;
        data.description = description;

        updatePlace(data).then(res => {
            res.text().then(resData => {
                if (res.ok) {
                    console.log(JSON.parse(resData).message);
                } else {
                    alert(JSON.parse(resData).message);
                }
                setDescription('');
                setPlace('');
                getUserPlaces(city);
                setEditPlace(false);
            })
        })
    }

    const doDeletePlace = (row) => {
        let data = new Object();
        data.id = crypto.randomUUID();
        data.username = userProfile;
        data.city = city;
        data.place = row.place;

        deletePlace(data).then(res => {
            res.text().then(resData => {
                if (res.ok) {
                    console.log(JSON.parse(resData).message);
                } else {
                    alert(JSON.parse(resData).message);
                }
                setDescription('');
                setPlace('');
                getUserPlaces(city);
                setEditPlace(false);
            })
        })
    }

    const doDeleteTrip = (row) => {
        let data = new Object();
        data.id = crypto.randomUUID();
        data.username = userProfile;
        data.city = row.city_name;

        deleteTrip(data).then(res => {
            res.text().then(resData => {
                if (res.ok) {
                    console.log(JSON.parse(resData).message);
                } else {
                    alert(JSON.parse(resData).message);
                }
                setCity('');
                getUserTrips();
            })
        })
    }

    const navbarProps = {
        activeUser: activeUser,
        onHomePage: false
    }

    const tripProps = {
        trips: trips,
        setShowTrips: setShowTrips,
        getUserPlaces: getUserPlaces,
        setCity: setCity,
        setEditTrip: setEditTrip,
        deleteTrip: doDeleteTrip
    }

    const placeProps = {
        city: city,
        places: places,
        setEditPlace: setEditPlace,
        setPlace: setPlace,
        setDescription: setDescription,
        deletePlace: doDeletePlace
    }

    return (
        <>
            <NavBar {...navbarProps} />
            <h1>Account Management</h1>
            {showTrips && !editTrip &&
                <>
                    <div>
                        <h2>Edit Account Info</h2>
                        <Form
                            name="email"
                            layout="horizontal"
                            onFinish={updateEmail}
                        >
                            <Form.Item name="new_email">
                                <Input placeholder="new Email Address" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                >Change Email Address
                                </Button>
                            </Form.Item>
                        </Form>
                        <Form
                            name="password"
                            layout="horizontal"
                            onFinish={updatePassword}
                        >
                            <Form.Item name="new_password">
                                <Input.Password placeholder="new Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                >Change Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        <h3>Edit Trips</h3>
                        <TripTable {...tripProps} />
                    </div>
                </>
                }
                {showTrips && editTrip &&
                    <>
                            <div>
                            <h3>Edit {city} Dates</h3>
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
                                <button onClick={updateDate}>Submit</button>
                            </div>
                    </>
                }
                {!showTrips && !editPlace &&
                    <>
                        <div>
                            <h3>Edit {city} Places</h3>
                            <PlaceTable {...placeProps} />
                        </div>
                    </>
                }
                {!showTrips && editPlace &&
                    <>
                        <div>
                            <h3>Edit {place} Description</h3>
                            <textarea
                                value={description}
                                rows="10"
                                cols="50"
                                onChange={e => setDescription(e.target.value)} />
                            <button onClick={updateDescription}>Submit</button>
                        </div>
                    </>
                }
        </>
    )
}
