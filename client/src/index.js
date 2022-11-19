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
import AccountPage from './pages/AccountPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profilePage/:user" element={<UserPage />} />
                <Route path="/friendsPage/:user" element={<FriendsPage />} />
                <Route path="/account/:user" element={<AccountPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
