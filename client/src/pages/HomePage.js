import React, { useState } from 'react';

import Map from '../components/Map';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import NavBar from '../components/NavBar';

export default function HomePage() {
  const [activeUser, setActiveUser] = useState(sessionStorage.getItem('active user'));

  const [signingUp, setSigningUp] = useState(false);

  const markers = [{ position: [32.715, -117.161], content: <><b>Wecome to San Diego </b><br /> Sister City to Tijuana, Mexico; Yokohama, Japan; and Tema, Ghana </> },
  { position: [41.882, -87.623], content: <><b>Welcome to Chicago</b> <br /> Home of the Twinkie </> }]

  const navbarProps = {
      activeUser: activeUser,
      onHomePage: true,
      setActiveUser: setActiveUser
  }

  const props = {
      setSigningUp: setSigningUp
  }

  return (
      <>
      <NavBar {...navbarProps} />
      <h1>Welcome to iTinerary!</h1>
      <p>Explore new places and share your favorite travel recommendations with friends. Build your profile to get started!</p>
      <Map markers={markers} />
      {(!activeUser || activeUser === '')
        ? (signingUp)
            ? <SignUpForm {...props} />
            : <LoginForm {...props} />
        : <br/>}
    </>
  )
}
