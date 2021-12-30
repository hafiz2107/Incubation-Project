import React, { useState, useEffect } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import Header from '../../components/header/Header'
import axios from 'axios'

const ViewSlots = () => {

    useEffect(() => {
        fetchSeats()
    }, [])

    const [seat, setSeat] = useState([])
    const [singleApp, setSingleApp] = useState({})
    const [show, setShow] = useState(false)

    const fetchSeats = async () => {
        try {
            const config = {
                "Content-Type": "application/json"
            }
            const { data } = await axios.get('/api/admin/fetchseats', config)
            setSeat(data.data)
        } catch (err) {
            console.log("THe error in fetching seats are : ", err)
        }
    }

    const handleViewApplication = async (appId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const { data } = await axios.get(`api/admin/viewapplication/${appId}`, config)
            setSingleApp(data.app)
            setShow(true)
        } catch (err) {
            console.log("The error is : ", err)
        }
    }
    return (
        <div>
            <Header />
            <Container>

                <div className='seatContainer'>
                    {
                        seat.map((seat, index) => {
                            return (
                                <>
                                    <Button key={seat._id} id={seat._id} className='seat' title="View Application" disabled={seat.isActive ? false : false} style={seat.isActive ? { backgroundColor: '#ffffffd1', cursor: 'help' } : { backgroundColor: '' }}
                                        onClick={() => {
                                            seat.isActive && handleViewApplication(seat.applicationId)
                                        }}
                                    >
                                        {`IN ${index + 1}`}
                                    </Button>
                                </>
                            )

                        })
                    }
                </div>
            </Container>
            <Modal show={show} fullscreen={true} onHide={() => {
                setShow(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">View Application : {singleApp._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    {
                        Object.keys(singleApp).map(key => {
                            return (
                                Object.keys(singleApp).map(key => {
                                    return (
                                        key !== 'pic' ?
                                            (<>
                                                <span>
                                                    <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {singleApp[key]}
                                                </span>
                                                <hr />
                                            </>) : (
                                                <>
                                                    <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>Company Logo</strong> <br />
                                                    <img src={singleApp[key]} alt="" style={{ height: '200px' }} /> <hr />
                                                </>
                                            )
                                    )
                                }
                                )
                            )
                        }
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                    }}>
                        Delete Application
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ViewSlots
