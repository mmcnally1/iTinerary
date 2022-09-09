import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import TripPage from './pages/TripPage';
import UserPage from './pages/UserPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/trip" element={<TripPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
