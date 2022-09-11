import React from 'react';
import { sendFriendRequest } from '../fetcher.js';

export default function FriendAdder(props) {
    const friendRequest = () => {
        sendFriendRequest(props).then((res) => {
            res.text().then((data) => {
                if (res.ok) {
                    console.log(JSON.parse(data).message);
                } else {
                    alert(JSON.parse(data).message);
                }
            });
        });
    }
    return (
        <button
            onClick={() => {
                friendRequest();
            }}
        >Add Friend</button>
    )
}
