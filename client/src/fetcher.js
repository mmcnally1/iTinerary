import config from './config.json';

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

export {
    getUserInfo,
    getFriends,
    getTrips,
    getPlaces
}