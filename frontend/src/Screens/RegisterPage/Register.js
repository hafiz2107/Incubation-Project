import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/Error/ErrorAlert'
import Loading from '../../components/Loading/Loading'
import MainScreen from '../../components/MainScreen/MainScreen'
import './Register.css'
import useForm from './useForm'
import validateForm from './validateForm'

const Register = () => {
    
    const navigate = useNavigate()
    
    const { handleChange, values, handleSubmit, formError, loading } = useForm(validateForm)


    return (
        <>
            <MainScreen title='SignUp' />
            <div className='registermain'>
                <Container>
                    <Form className='registerForm' onSubmit={(e) => {
                        handleSubmit(e)
                    }}>

                        <Form.Group className="mb-3" controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                className='loginInputs'
                                placeholder="Enter Username"
                                name="username"
                                value={values.username}
                                onChange={(e) => {
                                    handleChange(e)
                                }} />
                            <Form.Text className="text-danger">
                                {formError.username && formError.username}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                className='loginInputs'
                                placeholder="Enter email"
                                name="email"
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
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={(e) => {
                                    handleChange(e)
                                }} />
                            <Form.Text className="text-danger">
                                {formError.password && formError.password}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                className='loginInputs'
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                value={values.confirmpassword}
                                onChange={(e) => {
                                    handleChange(e)
                                }} />
                            <Form.Text className="text-danger">
                                {formError.confirmpassword && formError.confirmpassword}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading ? true : false}>
                            {loading ? <Loading /> : 'Sign Up'}
                        </Button>
                    </Form>
                    <Row className='logLink'>
                        <Col >
                            Already have an account ? <Link to='/login' className='logHere'>Login</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Register
