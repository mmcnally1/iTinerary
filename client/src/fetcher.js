import config from './config.json';

const authenticateUser = async(username) => {
    var res = await fetch(`/login/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's profile pic/bio
const getUserInfo = async (username) => {
    var res = await fetch(`/userInfo/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's friends + num trips for each friend
const getFriends = async (username) => {
    var res = await fetch(`/friends/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's trips
const getTrips = async(username) => {
    var res = await fetch(`/trips/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch Places given User, City
const getPlaces = async(username, city) => {
    var res = await fetch(`/places/${username}/${city}`, {
        method: 'GET'
    });
    return res.json();
}

const getFriendRequests = async(username) => {
    var res = await fetch(`/getfriendRequests/${username}`, {
        method: 'GET'
    });
    return res.json();
}

const postTrip = async(data) => {
    var res = await fetch(`/addTrip`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const postPlace = async(data) => {
    var res = await fetch(`/addPlace`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const addUser = async(data) => {
    var res = await fetch(`/addUser`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const sendFriendRequest = async(data) => {
    var res = await fetch(`/sendFriendRequest`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const confirmFriendRequest = async(data) => {
    var res = await fetch(`/confirmFriendRequest`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    return res;
}

const denyFriendRequest = async(data) => {
    var res = await fetch(`/denyFriendRequest`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    return res;
}

export {
    authenticateUser,
    getUserInfo,
    getFriends,
    getTrips,
    getPlaces,
    getFriendRequests,
    postTrip,
    postPlace,
    addUser,
    sendFriendRequest,
    confirmFriendRequest,
    denyFriendRequest
}
