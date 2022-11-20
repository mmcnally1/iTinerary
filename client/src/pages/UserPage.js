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
    const [profileExists, setProfileExists] = useState(true);

    useEffect(() => {
        displayUserInfo();
        authenticateUser();
        displayTripMarkers();
    }, []);

    const displayUserInfo = () => {
        getUserInfo(userProfile).then(res => {
            if (res.results.length == 1) {
                setUserInfo(res.results[0]);
                setProfileExists(true);
            }
            else {
                setProfileExists(false);
            }
        });
    }

    const authenticateUser = () => {
        if (activeUser == userProfile) {
            setAuthenticated(true);
            return;
        }
        if (userProfile === 'Mike') {
            setAuthenticated(true);
            return;
        }
        if (!activeUser || activeUser === '') {
            alert("Please login or create an account");
            navigate('/');
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

    const displayTripMarkers = () => {
        getTrips(userProfile).then(res => {
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.start_date = i.start_date.slice(0, 10);
                i.end_date = i.end_date.slice(0, 10);
                i.content = <> <b><font size="+1">{i.city_name}</font> </b> <br /> {i.start_date} to {i.end_date} </>;
            });
            setMarkers(res.results.map((i) => { return { position: i.position, content: i.content, city: i.city_name } }));
        })
    }

    const displayPlaceMarkers = (city) => {
        getPlaces(userProfile, city).then(res => {
            console.log(res.results);
            res.results.map((i) => {
                i.position = [i.latitude, i.longitude];
                i.content = <> <b>{i.place_name}</b> <br /> {i.description} </>;
            });
            setMarkers(res.results.map((i) => {return { position: i.position, content: i.content }}));
        })
    }

    const onCityClick = (position, city) => {
        console.log(city);
        setActiveLocation(position);
        displayPlaceMarkers(city);
    }

    const tripProps = {
        username: userProfile,
        displayMarkers: displayTripMarkers
    }

    const friendAdderProps = {
        requester: activeUser,
        requested: userProfile
    }

    const navbarProps = {
        activeUser: activeUser,
        onHomePage: false
    }

    return (
        <>
            <NavBar {...navbarProps} />
            <h1> {userProfile} </h1>
            {(authenticated)
                ? <p> {userInfo.about} </p>
                : <br />}
            {profileExists
                ? <button onClick={() => {
                    displayTripMarkers();
                    }}
                    >
                    Reset Map
                </button>
                : <br/>
        }
            {(profileExists)
                ? ((authenticated)
                    ? <Map markers={markers}
                        clickFn={onCityClick}
                        location={location}
                        setLocation={setLocation} />
                    : <Map markers={[]}
                        clickFn={null}
                        location={null}
                        setLocation={null} />)
                : <br/>}
            <div>
                {(profileExists)
                    ? ((activeUser == userProfile)
                        ? <TripAdder
                            username={userProfile}
                            displayMarkers={displayTripMarkers}
                            location={location}
                            setLocation={setLocation} />
                        : (!authenticated)
                            ? <FriendAdder {...friendAdderProps} />
                            : <br />)
                    : <h1 className="not-found">404: User Not Found</h1>}
                <br />
            </div>
        </>
    )
}
