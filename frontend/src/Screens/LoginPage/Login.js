import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/Error/ErrorAlert'
import Loading from '../../components/Loading/Loading'
import MainScreen from '../../components/MainScreen/MainScreen'

import './Login.css'


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(false);
    }, [email, password])

    useEffect(()=>{
        localStorage.getItem('userDetails') ? navigate('/') : navigate('/login');
    },[])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true)
            const { data } = await axios.post('/api/user/login', { email, password }, config)
            
            localStorage.setItem('userDetails', JSON.stringify(data))
            setLoading(false);
            navigate('/')
        } catch (err) {
            setError(err.response.data.message)
            setLoading(false);
        }
    }

    return (
        <>
            <MainScreen title='Login' />
            <div className='loginMain'>
                <Container>
                    <Form className='loginForm' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        {error && <ErrorAlert variant=''>{error}</ErrorAlert>}
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
