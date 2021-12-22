import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'

export const LandingPage = () => {
    return (
        <div className='main text-center'>
            <Container>
                <Row>
                    <div>
                        <h1 className='title'>Welcome To Incubation </h1>
                    </div>

                    <div className='buttonContainer'>
                        <a href="/login" className='login'>
                            <Button className='login-btn'>Login</Button>
                        </a>

                        <a href="/login" className='signUp'>
                            <Button className='signup-btn' >Signup</Button>
                        </a>
                    </div>
                </Row>

            </Container>
        </div>
    )
}
