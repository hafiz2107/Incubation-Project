import React from 'react';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
function Header() {
    const loggedInUser = JSON.parse(localStorage.getItem('userDetails'))
    const navigate = useNavigate()


    return (
        <>
            {
                loggedInUser &&

                <Container fluid>
                    <Navbar bg="" text="primary" expand="lg">
                        <Container>
                            <Navbar.Brand href="#" style={{ letterSpacing: "8px" }}>
                                {
                                    loggedInUser.isAdmin ? <Link to='/adminhome'>INCUBATION ADMIN</Link> : <Link to='/'>INCUBATION</Link>
                                }
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">

                                <Nav
                                    className="my-2 my-lg-0"
                                    style={{ maxHeight: '80px', marginLeft: 'auto' }}
                                    navbarScroll
                                >
                                    <Nav.Link>
                                        {
                                            loggedInUser.isAdmin ?
                                                (
                                                    <>
                                                        <Link to='/viewapplications' className='view'>View Applications </Link>
                                                        <Link to='/recordlist' className='ms-2 record'>Record List</Link>
                                                        <Link to='/viewslots' className='ms-2 record'>View Slots</Link>
                                                    </>
                                                ) :
                                                <Link to='/myapplications'>My Applications</Link>
                                        }
                                    </Nav.Link>

                                    <NavDropdown title={loggedInUser.name} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action5" onClick={() => {
                                            localStorage.removeItem('userDetails');
                                            navigate('/login')
                                        }}>Log Out</NavDropdown.Item>
                                    </NavDropdown>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            }
        </>
    )
}

export default Header
