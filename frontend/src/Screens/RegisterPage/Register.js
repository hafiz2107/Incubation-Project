import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/Error/ErrorAlert'
import Loading from '../../components/Loading/Loading'
import MainScreen from '../../components/MainScreen/MainScreen'
import './Register.css'

const Register = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        setMessage(null)
    }, [confirmPassword])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords Doesn't match !")
        } else {
            setMessage(null)
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }

                setLoading(true)
                const { data } = await axios.post('/api/user', { userName, email, password }, config)
                setLoading(false)
                setError(false)
                localStorage.setItem("userDetails", JSON.stringify(data))
                navigate('/login')
            } catch (err) {
                setError(err.response.data.message)
                setLoading(false)
            }
        }

    }


    return (
        <>
            <MainScreen title='SignUp' />
            <div className='registermain'>
                <Container>
                    <Form className='registerForm' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        {error && <ErrorAlert variant=''>{error}</ErrorAlert>}
                        {message && <ErrorAlert variant='danger'>{message}</ErrorAlert>}

                        <Form.Group className="mb-3" controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                className='loginInputs'
                                placeholder="Enter Username"
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                className='loginInputs'
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                className='loginInputs'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                className='loginInputs'
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
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
