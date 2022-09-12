import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import FriendsPage from './pages/FriendsPage';
import UserPage from './pages/UserPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:user" element={<UserPage />} />
                <Route path="/friends/:user" element={<FriendsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
