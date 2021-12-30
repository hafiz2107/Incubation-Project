import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/Error/ErrorAlert'
import Header from '../../components/header/Header'
import Loading from '../../components/Loading/Loading'
import './CreateApplication.css'

const CreateApplication = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [phoneno, setPhone] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [team, setTeam] = useState("")
    const [products, setProducts] = useState("")
    const [problem, setProblem] = useState("")
    const [solution, setSolution] = useState("")
    const [value, setValue] = useState("")
    const [competitors, setCompetitors] = useState("")
    const [revenue, setRevenue] = useState("")
    const [marketSize, setMarketSize] = useState("")
    const [marketPlan, setMarketPlan] = useState("")
    const [phyIncubation, setPhyIncubation] = useState(false)
    const [virIncubation, setVirIncubation] = useState("")
    const [proposal, setProposal] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [pic, setPic] = useState('')
    const [picMessage, setPicMessage] = useState(null)


    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const userId = JSON.parse(localStorage.getItem('userDetails'))
            const { data } = await axios.post('/api/user/createapplication', {
                userId: userId._id,
                name,
                address,
                city,
                state,
                email,
                pic,
                phoneno,
                companyName,
                team,
                products,
                problem,
                solution,
                value,
                competitors,
                revenue,
                marketSize,
                marketPlan,
                incubation: phyIncubation ? "physical" : "virtual",
                proposal,
            }, config)
            setLoading(false)
            console.log("Data : ", data)
            navigate('/myapplications')
        } catch (err) {
            setError(err.response.data.message)
            setLoading(false)
            console.log("the error is : ", err.response.data.message)
        }


    }

    const postDetails = (pics) => {
        setPicMessage(null)
        if (!pics) {
            return setPicMessage("Please Select an image !")
        } else {
            setPicMessage(null)
            if (pics.type === 'image/jpeg' || pics.type === 'image/jpg' || pics.type === 'image/png') {
                setLoading(true)
                const data = new FormData()
                data.append('file', pics)
                data.append('upload_preset', 'incubator')
                data.append('cloud_name', 'hafiz2107')
                fetch('https://api.cloudinary.com/v1_1/hafiz2107/image/upload', {
                    method: "post",
                    body: data,
                }).then(async (res) => {
                    const uploadDetails = await res.json()
                    console.log("The upload details are : ", uploadDetails)
                    setPic(uploadDetails.url)
                    setLoading(false)
                }).catch((err) => {
                    setLoading(false)
                    setPicMessage("Server Error !")
                })
            } else {
                return setPicMessage("Not Valid file type")
            }

        }
    }

    return (
        <div>
            <Header />
            <Container>
                {error && <ErrorAlert variant=''>{error}</ErrorAlert>}
                <Form onSubmit={submitHandler}>

                    <Row>
                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name<span className='required'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" required={true} value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>

                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address<span className='required'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" required={true} value={address} onChange={(e) => {
                                    setAddress(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>

                    </Row>
                    {/*  */}
                    <Row>
                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>City<span className='required'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter City" required={true} value={city} onChange={(e) => {
                                    setCity(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>

                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="state">
                                <Form.Label>State<span className='required'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter State" required={true} value={state} onChange={(e) => {
                                    setState(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {/*  */}
                    <Row>
                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email<span className='required'>*</span></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" required={true} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>

                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone No<span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" placeholder="Enter Phone" required={true} value={phoneno} onChange={(e) => {
                                    setPhone(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {/*  */}
                    <Row>
                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Company<span className='required'>*</span></Form.Label>
                                <Form.Control type="text" placeholder="Enter Company name" required={true} value={companyName} onChange={(e) => {
                                    setCompanyName(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>

                        {/* Image Here */}
                        <Col className='col-xs-12 col-sm-12 col-md-6'>
                            <Form.Group controlId="formFile" className="mb-3" onChange={(e) => {
                                postDetails(e.target.files[0])
                            }}>
                                <Form.Label>{loading ? <Loading /> : "Company Logo"}</Form.Label>
                                
                                <Form.Control type="file" custom disabled={loading ? true : false} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="team">
                                <Form.Label>Describe Your Team And Background</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={team} onChange={(e) => {
                                    setTeam(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="products">
                                <Form.Label>Describe Your Company and Products </Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={products} onChange={(e) => {
                                    setProducts(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="problem">
                                <Form.Label>Describe the problem you are trying to solve</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={problem} onChange={(e) => {
                                    setProblem(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="uniqueness">
                                <Form.Label>What is unique about your solution ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={solution} onChange={(e) => {
                                    setSolution(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="problem">
                                <Form.Label>What is your value propostion for the customer ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={value} onChange={(e) => {
                                    setValue(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="competitor">
                                <Form.Label>Who are your competitors and what is you competetive advantage ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={competitors} onChange={(e) => {
                                    setCompetitors(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="revenue">
                                <Form.Label>What is your revenue Model ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={revenue} onChange={(e) => {
                                    setRevenue(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="marketSize">
                                <Form.Label>What is the potential market size of your product ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={marketSize} onChange={(e) => {
                                    setMarketSize(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="marketSize">
                                <Form.Label>How do you market or plan to market your products and services ?</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={marketPlan} onChange={(e) => {
                                    setMarketPlan(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="marketSize">
                                <Form.Label>How do you market or plan to market your products and services ?</Form.Label>
                                <Form.Check
                                    type='radio'
                                    label='Physical Incubation'
                                    checked={phyIncubation && true}
                                    onClick={() => {
                                        setPhyIncubation(true)
                                        setVirIncubation(false)
                                    }}
                                />

                                <Form.Check
                                    type='radio'
                                    label='Virtual Incubation'
                                    checked={virIncubation && true}
                                    onClick={() => {
                                        setPhyIncubation(false)
                                        setVirIncubation(true)
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="proposal">
                                <Form.Label>Detailed buissness Proposal</Form.Label>
                                <Form.Control as="textarea" rows={3} required={true} value={proposal} onChange={(e) => {
                                    setProposal(e.target.value)
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" disabled={loading ? true : false}>
                        {loading ? <Loading /> : 'Submit'}
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default CreateApplication
