import React, { useState, useEffect } from 'react';
import TripAdder from '../components/TripAdder.js';
import Map from '../components/Map'
import { useNavigate, useParams } from 'react-router-dom';

import {
    getUserInfo,
    getTrips,
    getPlaces,
    getFriends,
    getFriendRequests,
    confirmFriendRequest,
    denyFriendRequest
} from '../fetcher.js';

//import PlaceAdder, { LocationMarkers } from '../components/PlaceAdder.js';
import NavBar from '../components/NavBar';
import FriendAdder from '../components/FriendAdder';

export default function UserPage() {
    const navigate = useNavigate();
    let userProfile = useParams().user;

    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));

    const [userInfo, setUserInfo] = useState({});
    const [markers, setMarkers] = useState([]);
    const [activeLocation, setActiveLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [zoom, setZoom] = useState(1);

    const [friends, setFriends] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (activeUser == '') {
            navigate('/');
        }
        else {
            authenticateUser();
            displayUserInfo();
            displayTripMarkers();
        }
    }, []);

    const displayUserInfo = () => {
        getUserInfo(userProfile).then(res => {
            if (res.results.length == 1) {
                setUserInfo(res.results[0]);
            } else {
                alert('Not a valid user profile page');
            }
        });
    }

    const authenticateUser = () => {
        if (activeUser == userProfile) {
            setAuthenticated(true);
            return;
        }
        getFriends(userProfile).then(res => {
            setFriends(res.results);
            for (var i = 0; i < res.results.length; i++) {
                if (res.results[i].friend == activeUser) {
                    setAuthenticated(true);
                    return;
                }
            }
            setAuthenticated(false);
        });
    }
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

    const displayTripMarkers = () => {
        getTrips(userProfile).then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.start_date = i.start_date.slice(0, 10);
                i.end_date = i.end_date.slice(0, 10);
                i.content = <> <b><font size="+1">{i.city_name}</font> </b> <br /> {i.start_date} to {i.end_date} </>;
            });
            setMarkers(res.results.map((i) => { return { position: i.position, content: i.content } }));
        })
    }

    const displayPlaceMarkers = (city) => {
        getPlaces(userProfile, "Chicago").then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.content = <> <b>{i.place_name}</b> <br /> {i.description} </>;
            });
            setMarkers(res.results.map((i) => {return { position: i.position, content: i.content }}));
        })
    }

    const onCityClick = (city) => {
        console.log(city);
        setActiveLocation(city);
        displayPlaceMarkers(city);
    }

    tripProps = {
        username: userProfile,
        displayMarkers: displayTripMarkers
    }

    friendAdderProps = {
        requester: activeUser,
        requested: userProfile
    }

    navbarProps = {
        activeUser: activeUser
    }

    return (
        <>
            <NavBar {...navbarProps} />
            <h1> {userProfile} </h1>
            <h4> Bio: </h4>
            {(authenticated)
                ? <p> {userInfo.about} </p>
                : <br />}
            <button onClick={() => {
                    displayTripMarkers();
                }}
            >
            Reset Map
            </button>
            <Map markers={markers}
                clickFn={onCityClick}
                location={location}
                setLocation={setLocation} />
            {
                (activeLocation == null)
                    ? <h3>Select a destination from the map.</h3>
                    : <TripSummary info={activeLocation} />
            }
            <div>
                {(activeUser == userProfile)
                    ? <TripAdder username={userProfile}
                        displayMarkers={displayTripMarkers}
                        location={location}
                        setLocation={setLocation} />
                    : <FriendAdder {...friendAdderProps} />}
                <br />
            </div>
        </>
    )
}
