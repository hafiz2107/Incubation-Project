import React, { useEffect, useState } from 'react';

import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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
                                <Nav className='m-auto'>
                                    <Form className="d-flex mt-2" inline>
                                        <FormControl
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />

                                    </Form>
                                </Nav>
                                <Nav
                                    className="my-2 my-lg-0"
                                    style={{ maxHeight: '80px' }}
                                    navbarScroll
                                >
                                    <Nav.Link>
                                        {
                                            loggedInUser.isAdmin ?
                                                (
                                                    <>
                                                        <Link to='/viewapplications' className='view'>View Applications </Link>   
                                                        <Link to='/recordlist' className='ms-2 record'>Record List</Link>
                                                    </>
                                                ) :
                                                <Link to='/myapplications'>My Applications</Link>
                                        }
                                    </Nav.Link>

                                    <NavDropdown title={loggedInUser.name} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
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
