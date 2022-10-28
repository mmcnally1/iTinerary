//import config from './config.json';

const server_host = "mm-itinerary.herokuapp.com";

const authenticateUser = async(username, password) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/login/${username}/${password}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's profile pic/bio
const getUserInfo = async (username) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/userInfo/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's friends + num trips for each friend
const getFriends = async (username) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/friends/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's trips
const getTrips = async(username) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/trips/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch Places given User, City
const getPlaces = async(username, city) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/places/${username}/${city}`, {
        method: 'GET'
    });
    return res.json();
}

const getFriendRequests = async(username) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/getfriendRequests/${username}`, {
        method: 'GET'
    });
    return res.json();
}

const postTrip = async(data) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/addTrip`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const postPlace = async(data) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/addPlace`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const addUser = async(data) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/addUser`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const sendFriendRequest = async(data) => {
    var res = await fetch(`http://${server_host}:${process.env.PORT}/sendFriendRequest`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const confirmFriendRequest = async(data) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/confirmFriendRequest`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    return res;
}

const denyFriendRequest = async(data) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/denyFriendRequest`, {
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
