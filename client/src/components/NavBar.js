import React from 'react';
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

export default function NavBar(props) {
    const navigate = useNavigate();
    const activeUser = props.activeUser;

    return (
        <>
            <CNavbar expand="lg">
                <CContainer fluid>
                    <CNavbarBrand href='/'>Home</CNavbarBrand>
                    <CNavbarNav>
                        <CNavItem>
                            <CNavLink href={`/profile/${activeUser}`} active >
                                Profile
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href={`/friends/${activeUser}`} active >
                                Friends
                            </CNavLink>
                        </CNavItem>
                        <CForm>
                            <CFormInput type="search" placeholder="Search" />
                            <CButton type="submit">
                                Search
                            </CButton>
                        </CForm>
                        <CNavItem>
                            <CButton>
                                Logout
                            </CButton>
                        </CNavItem>
                    </CNavbarNav>
                </CContainer>
            </CNavbar>
        </>
    )
}
