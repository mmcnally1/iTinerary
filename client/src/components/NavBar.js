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
    const activeUser = props.activeUser;
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
                            <CNavLink href={`/profile/${activeUser}`}
                                disabled={
                                    (activeUser === '')
                                    ? true
                                    : false
                                }>
                                Profile
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href={`/friends/${activeUser}`}
                                disabled={
                                    (activeUser === '')
                                    ? true
                                    : false
                                }>
                                Friends
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
                                href={`/profile/${input}`}>
                                Search
                            </CButton>
                        </CForm>
                        <CNavItem>
                            <button
                                className='logout-button'
                                onClick={() => {
                                    sessionStorage.setItem('active user', '');
                                    navigate('/');
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
