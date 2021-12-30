import React from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import Header from '../../components/header/Header'
import './Seat.css'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { ApplicationContext } from '../../Store/ApplicationContext'
import { useNavigate } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'

const Seat = () => {
    const { applicationDetails } = useContext(ApplicationContext)
    const [seat, setSeat] = useState([])
    const [singleApp, setSingleApp] = useState({})
    const [show, setShow] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const [appToAllot, setAppToAllot] = useState({})
    const [seatNo, setSeatNo] = useState('')
    useEffect(() => {
        fetchSeats()
    }, [])

    const navigate = useNavigate()

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

    const handleAddSeat = () => {
        try {
            const config = {
                "Content-Type": "application/json"
            }
            const { data } = axios.post('/api/admin/addseat', config)
            fetchSeats()
        } catch (err) {
            console.log("THe error in adding seat : ", err)
        }
    }

    const handleSeatAllocation = async (seat,seatNo) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.patch('api/admin/allotseat', { seat, applicationDetails ,seatNo}, config)
        fetchSeats()
        navigate('/viewapplications')
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
        <>
            <Header />
            <Container>
                <Button onClick={handleAddSeat}>Add Seat</Button>
                <div className='seatContainer'>
                    {
                        seat.map((seat, index) => {
                            return (
                                <>
                                    <Button key={seat._id} id={seat._id}
                                        className='seat'
                                        style={seat.isActive ? { backgroundColor: '#ffffffd1', cursor: 'help' } : { backgroundColor: '' }}
                                        onClick={() => {
                                            seat.isActive ?
                                                handleViewApplication(seat.applicationId)
                                                :
                                                setAlertShow(true);
                                                setAppToAllot(seat);
                                                setSeatNo(`IN ${index + 1}`)

                                        }}
                                    >
                                        {`IN ${index + 1}`}
                                    </Button>

                                    <SweetAlert
                                        info
                                        showCancel
                                        show={alertShow}
                                        confirmBtnText="Give Seat"
                                        confirmBtnBsStyle="success"
                                        cancelBtnBsStyle="danger"
                                        title="Are you sure?"
                                        onConfirm={() => handleSeatAllocation(appToAllot,seatNo)}
                                        onCancel={() => setAlertShow(false)}
                                    >
                                        Are You Sure To allot seat to the user ?
                                    </SweetAlert>

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


        </>
    )
}

export default Seat
