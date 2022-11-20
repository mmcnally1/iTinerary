import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getFriends, getFriendRequests, confirmFriendRequest, denyFriendRequest, removeFriend } from '../fetcher.js';
import NavBar from '../components/NavBar';
import FriendList from '../components/FriendList';
import FriendRequests from '../components/FriendRequests'

export default function FriendsPage() {
    let userProfile = useParams().user;

    const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (!activeUser || activeUser == '') {
            alert("Please login or create an account")
            navigate('/');
        } else {
            authenticateUser();
            displayFriendRequests();
        }
    }, []);

    const displayFriendRequests = () => {
        getFriendRequests(userProfile).then(res => {
            setFriendRequests(res.results);
        });
    }

    const displayFriends = () => {
        getFriends(userProfile).then(res => {
            setFriends(res.results);
        });
    }

    const authenticateUser = () => {
        if (activeUser == userProfile) {
            setAuthenticated(true);
            getFriends(userProfile).then(res => {
                setFriends(res.results);
            })
        } else {
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
    }

    const handleConfirmFriendRequest = (values) => {
        confirmFriendRequest(values).then((res) => {
            console.log(res);
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    displayFriendRequests();
                    displayFriends();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
    }

    const handleDenyFriendRequest = (values) => {
        denyFriendRequest(values).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                    displayFriendRequests();
                    displayFriends();
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
    }

    const handleRemoveFriend = (values) => {
        removeFriend(values).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    displayFriendRequests();
                    displayFriends();
                    console.log(JSON.parse(data).message);
                } else {
                    alert(JSON.parse(data).message);
                }
            })
        })
    }

    const friendRequestsProps = {
        friendRequests: friendRequests,
        username: userProfile,
        handleConfirmFriendRequest: handleConfirmFriendRequest,
        handleDenyFriendRequest: handleDenyFriendRequest
    }

    const friendListProps = {
        friends: friends,
        username: userProfile,
        handleRemoveFriend = handleRemoveFriend
    }

    const navbarProps = {
        activeUser: activeUser,
        onHomePage: false
    }

    return (
        <>
        <NavBar {...navbarProps} />
        <h1> {userProfile}s Friends </h1>
        {(activeUser == userProfile && friendRequests.length > 0)
            ? <FriendRequests {...friendRequestsProps} />
            : <br />}
        {(authenticated)
            ? <FriendList {...friendListProps} />
            : <br />}
        </>
    );
}
