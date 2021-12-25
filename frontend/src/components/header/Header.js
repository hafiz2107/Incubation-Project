import React from 'react';

import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom'
function Header() {
    const loggedInUser = localStorage.getItem('userDetails')
    const navigate = useNavigate()
    return (
        <>
            {
                loggedInUser &&

                <Container fluid>
                    <Navbar bg="" text="primary" expand="lg">
                        <Container>
                            <Navbar.Brand href="#" style={{ letterSpacing: "8px" }}>
                                <Link to='/'>INCUBATION</Link>
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
                                        <Link to='/myapplications'>My Applications</Link>
                                    </Nav.Link>

                                    <NavDropdown title="Hafiz Muhammad" id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5" onClick={()=>{
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
