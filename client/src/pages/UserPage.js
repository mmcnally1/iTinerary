import React, { useState, useEffect, createContext } from 'react';
import { getUserInfo, getTrips } from '../fetcher.js';
import TripAdder from '../components/TripAdder.js';
import Map from '../components/Map'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    getUserInfo,
    getTrips,
    getFriends,
    getFriendRequests,
    confirmFriendRequest,
    denyFriendRequest
} from '../fetcher.js';

import TripAdder from '../components/TripAdder.js';
//import PlaceAdder, { LocationMarkers } from '../components/PlaceAdder.js';
import Map from '../components/Map';
import NavBar from '../components/NavBar';
import FriendAdder from '../components/FriendAdder';
import FriendRequests from '../components/FriendRequests';
import FriendList from '../components/FriendList';

export default function UserPage() {
    const navigate = useNavigate();
    let userProfile = useParams().user;

    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));

    const [userInfo, setUserInfo] = useState({});
    const [markers, setMarkers] = useState([]);
    const [activeLocation, setActiveLocation] = useState(null);
    const [location, setLocation] = useState(null);

    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (activeUser == '') {
            navigate('/');
        }
        else {
            displayUserInfo();
            displayFriendRequests();
            authenticateUser();
            displayMarkers();
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

    const displayFriendRequests = () => {
        getFriendRequests(userProfile).then(res => {
            setFriendRequests(res.results);
        });
    }

    const authenticateUser = () => {
        if (activeUser == userProfile) {
            setAuthenticated(true);
        }
        getFriends(userProfile).then(res => {
            setFriends(res.results);
            for (var i = 0; i < res.results.length; i++) {
                if (res.results[i].friend == activeUser) {
                    setAuthenticated(true);
                }
            }
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

    const displayMarkers = () => {
        getTrips(userProfile).then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.start_date = i.start_date.slice(0, 10);
                i.end_date = i.end_date.slice(0, 10);
                i.content = <> {i.photo} <br /> <b> {i.city_name} </b> <br /> {i.start_date} - {i.end_date} <br /> {i.review} </>;
            });
            setMarkers(res.results.map((i) => { return { position: i.position, content: i.content } }));
        })
    }

    const handleConfirmFriendRequest = (values) => {
        confirmFriendRequest(values).then((res) => {
            console.log(res);
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    displayFriendRequests();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
    }

    const handleDenyFriendRequest = (values) => {
        denyFriendRequest(values).then((res) => {
            console.log(res);
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    displayFriendRequests();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
    }

    tripProps = {
        username: userProfile,
        displayMarkers: displayMarkers
    }

    friendAdderProps = {
        requester: activeUser,
        requested: userProfile
    }

    friendRequestsProps = {
        friendRequests: friendRequests,
        username: userProfile,
        handleConfirmFriendRequest: handleConfirmFriendRequest,
        handleDenyFriendRequest: handleDenyFriendRequest
    }

    friendListProps = {
        friends: friends
    }

    return (
        <>
            <NavBar />
            {(activeUser == userProfile && friendRequests.length > 0)
                ? <FriendRequests {...friendRequestsProps} />
                : <br />}
            <h1> {userProfile} </h1>
            <h4> Bio: </h4>
            {(authenticated)
                ? <p> {userInfo.about} </p>
                : <br />}
            {(authenticated && friends.length > 0)
                ? <FriendList {...friendListProps} />
                : <br />}
            <Map markers={markers}
                clickFn={setActiveLocation}
                location={location}
                setLocation={setLocation} />
            {
                (activeLocation == null)
                    ? <h3>Select a destination from the map.</h3>
                    : <TripSummary info={activeLocation} />
            }
            <div>
                {(activeUser == userProfile)
                    ? <TripAdder username={userInfo.username}
                        displayMarkers={displayMarkers}
                        location={location}
                        setLocation={setLocation} />
                    : <FriendAdder {...friendAdderProps} />}
                <br />
            </div>
        </>
    )
}
