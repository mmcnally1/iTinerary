import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import TripPage from './pages/TripPage';
import UserPage from './pages/UserPage';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact
                                    path="/"
                                    render={() => (
                                        <HomePage />
                                    )} />
                    <Route exact
                                    path="/profile"
                                    render={() => (
                                        <UserPage />
                                    )} />
                    <Route exact
                                    path="/trip"
                                    render={() => (
                                        <TripPage />
                                    )} />
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
