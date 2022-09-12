import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getFriends, getFriendRequests } from '../fetcher.js';
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
        if (activeUser == '') {
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

    friendRequestsProps = {
        friendRequests: friendRequests,
        username: userProfile,
        handleConfirmFriendRequest: handleConfirmFriendRequest,
        handleDenyFriendRequest: handleDenyFriendRequest
    }

    friendListProps = {
        friends: friends
    }

    navbarProps = {
        activeUser: activeUser
    }

    return (
        <>
        <NavBar {...navbarProps} />
        <h1> {userProfile}'s Friends </h1>
        {(activeUser == userProfile && friendRequests.length > 0)
            ? <FriendRequests {...friendRequestsProps} />
            : <br />}
        {(authenticated)
            ? <FriendList {...friendListProps} />
            : <br />}
        </>
    );
}
