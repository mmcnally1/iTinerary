import config from './config.json';

const authenticateUser = async(username, password) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/login/${username}/${password}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's profile pic/bio
const getUserInfo = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/userInfo/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's friends + num trips for each friend
const getFriends = async (username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/friends/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch User's trips
const getTrips = async(username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trips/${username}`, {
        method: 'GET'
    });
    return res.json();
}

// Fetch Places given User, City
const getPlaces = async(username, city) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/places/${username}/${city}`, {
        method: 'GET'
    });
    return res.json();
}

const getFriendRequests = async(username) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/getfriendRequests/${username}`, {
        method: 'GET'
    });
    return res.json();
}

const postTrip = async(data) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/addTrip`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const addUser = async(data) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/addUser`, {
        method: 'POST',
        body: JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return res;
}

const sendFriendRequest = async(data) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/sendFriendRequest`, {
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
    addUser,
    sendFriendRequest,
    confirmFriendRequest,
    denyFriendRequest
}
