import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CContainer,
    CForm,
    CFormInput,
    CButton
} from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';
import '../static/main.css';

export default function NavBar(props) {
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useState(props.activeUser);
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

    return (
        <>
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href='/'>Home</CNavbarBrand>
                    <CNavbarNav>
                        <CNavItem>
                            <CNavLink href={`/profilePage/${activeUser}`}
                                disabled={
                                    (activeUser === '')
                                    ? true
                                    : false
                                }>
                                Profile
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href={`/friendsPage/${activeUser}`}
                                disabled={
                                    (activeUser === '')
                                    ? true
                                    : false
                                }>
                                Friends
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href={`/account/${activeUser}`}
                                disabled={
                                    (activeUser === '')
                                    ? true
                                    : false
                                }>
                                Account
                            </CNavLink>
                        </CNavItem>
                        <CForm
                            className="d-flex"
                        >
                            <CFormInput
                                type="search"
                                className="me-2"
                                placeholder="Search for Users"
                                onChange={handleChange} />
                            <CButton type="submit"
                                href={`/profilePage/${input}`}>
                                Search
                            </CButton>
                        </CForm>
                        <CNavItem>
                            <button
                                className='logout-button'
                                onClick={() => {
                                    if (props.onHomePage) {
                                        sessionStorage.setItem('active user', '');
                                        props.setActiveUser('');
                                    }
                                    else {
                                        sessionStorage.setItem('active user', '');
                                        navigate('/');
                                    }
                                }}
                            >
                                Logout
                            </button>
                        </CNavItem>
                    </CNavbarNav>
                </CContainer>
            </CNavbar>
        </>
    )
}
