import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export const LandingPage = () => {


    return (
        <div className='main text-center'>
            <Container>
                <Row>
                    <div>
                        <h1 className='title'>Welcome To Incubation </h1>
                    </div>


                    {localStorage.getItem('userDetails') ?
                        (<Link to='/myapplications' className='signUp'>
                            <Button className='signup-btn' >My Applications</Button>
                        </Link>) :
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
    )
}
