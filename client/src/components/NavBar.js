import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                sessionStorage.setItem('active user', '');
                navigate('/');
            }}
        >Logout</button>
    )
}
