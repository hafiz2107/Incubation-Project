import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/Error/ErrorAlert'
import Loading from '../../components/Loading/Loading'
import MainScreen from '../../components/MainScreen/MainScreen'
import UseForm from './UseForm'
import validateForm from './validateForm'

import './Login.css'


const Login = () => {


    const { handleChange, values, handleSubmit, formError, error, loading } = UseForm(validateForm)
    const navigate = useNavigate()



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userDetails'))
        if (user) {
            user.isAdmin ? navigate('/adminhome') : navigate('/');
        } else {
            navigate('/login')
        }

    }, [])

    return (
        <>
            <MainScreen title='Login' />
            <div className='loginMain'>
                <Container>
                    <Form className='loginForm' onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        {error && <ErrorAlert variant=''>{error}</ErrorAlert>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control  
                                type="email"
                                className='loginInputs'
                                placeholder="Enter email"
                                name='email'
                                value={values.email}
                                onChange={(e) => {
                                    handleChange(e)
                                }} />
                            <Form.Text className="text-danger">
                                {formError.email && formError.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                className='loginInputs'
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={(e) => {
                                    handleChange(e)
                                }} />

                            <Form.Text className="text-danger">
                                {formError.password && formError.password}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading ? true : false}>

                            {loading ? <Loading /> : 'Submit'}
                        </Button>
                    </Form>
                    <Row className='regLink'>
                        <Col >
                            New User ? <Link to='/register' className='registerHere'>Register Here</Link>
                        </Col>
                    </Row>
                </Container>

            </div>
        </>
    )
}

export default Login
