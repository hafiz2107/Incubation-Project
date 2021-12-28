import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'

const AdminHome = () => {
    const adminLoggedIn = JSON.parse(localStorage.getItem('userDetails'))
    return (
        <>
            <Header />
            <div className='main text-center'>
                <Container>
                    <Row>
                        <div>
                            <h1 className='title'>Welcome Admin </h1>
                        </div>


                        {adminLoggedIn ?
                            (
                                <>
                                <br />
                                    <div className='buttonContainer'>
                                        <Link to='/viewapplications' className='login'>
                                            <Button className='login-btn' >View Applications</Button>
                                        </Link>
                                        <Link to='/recordlist' className='signUp'>
                                            <Button className='signup-btn' >Record List</Button>
                                        </Link>
                                    </div>
                                </>
                            ) :
                            (<div className='buttonContainer'>
                                <Link to='/login' className='login'>
                                    <Button className='login-btn'>Login</Button>
                                </Link>

                                <Link to='/register' className='signUp'>
                                    <Button className='signup-btn' >Signup</Button>
                                </Link>
                            </div>)
                        }
                    </Row>

                </Container>
            </div>
        </>
    )
}

export default AdminHome
