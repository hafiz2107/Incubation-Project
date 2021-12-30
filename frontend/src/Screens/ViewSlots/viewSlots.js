import React, { useState, useEffect } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import Header from '../../components/header/Header'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'

const ViewSlots = () => {

    useEffect(() => {
        fetchSeats()
    }, [])

    const [seat, setSeat] = useState([])
    const [singleApp, setSingleApp] = useState({})
    const [show, setShow] = useState(false)
    const [setpendingModal, setModalForPendingApps] = useState(false)
    const [pendingApps, setPendingApps] = useState([])
    const [slot, setSlot] = useState({})
    const [loading, setLoading] = useState(false)

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

    const fetchPendingApplications = async () => {
        try {
            const config = {
                "Content-Type": "application/json"
            }
            const { data } = await axios.get('/api/admin/fetchpendingapplications', config)
            setPendingApps(data.data)
        } catch (err) {
            console.log("the error in fetching pending applications are : ", err)
        }
    }

    const allotSeatForApp = async (app) => {

        try {
            const config = {
                "Content-Type": "application/json"
            }
            const seat = slot.seat
            slot.index = `IN ${slot.index + 1}`

            const { data } = await axios.patch('/api/admin/allotseat', { applicationDetails: { ...app }, seat, seatNo: slot.index }, config)
            fetchSeats()
        } catch (err) {
            console.log("the error in fetching pending applications are : ", err)
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

    const handleAppDelete = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('api/admin/deletefromslot', { ...singleApp }, config)
            fetchSeats()
        } catch (err) {
            console.log("the error in dleting : ", err)
        }
    }
    const handleAddSeat = () => {
        try {
            setLoading(true)
            const config = {
                "Content-Type": "application/json"
            }
            const { data } = axios.post('/api/admin/addseat', config)
            setLoading(false)
            fetchSeats()
        } catch (err) {
            setLoading(false)
            console.log("THe error in adding seat : ", err)
        }
    }
    return (
        <div>
            <Header />
            <Container>
                <Button disabled={loading ? true : false} onClick={handleAddSeat}>{loading ? <Loading /> : 'Add Seat'}</Button>
                <div className='seatContainer'>
                    {
                        seat.map((seat, index) => {
                            return (
                                <>
                                    <Button key={seat._id} id={seat._id} className='seat' title="View Application" disabled={seat.isActive ? false : false} style={seat.isActive ? { backgroundColor: '#ffffffd1', cursor: 'help' } : { backgroundColor: '' }}
                                        onClick={() => {
                                            seat.isActive ? handleViewApplication(seat.applicationId)
                                                :
                                                <>
                                                    {setSlot({ seat, index })}
                                                    {fetchPendingApplications()}
                                                    {setModalForPendingApps(true)}
                                                </>
                                        }}
                                    >
                                        {`IN ${index + 1}`}
                                    </Button>
                                </>
                            )

                        })
                    }
                </div>
            </Container >
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
                                    </>
                                    ) : (
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
                        handleAppDelete()
                        setShow(false);
                    }}>
                        Delete Application from slot
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Pending apps */}

            <Modal show={setpendingModal} onHide={() => {
                setModalForPendingApps(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">Pending Applications</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    {
                        pendingApps.length > 0 ?
                            (
                                pendingApps.map((app, index) => {
                                    return (
                                        <>
                                            <span>{app.companyName}</span>
                                            <Button style={{ float: 'right' }} onClick={() => {
                                                allotSeatForApp(app)
                                                setModalForPendingApps(false)
                                            }}>Give Slot</Button>
                                        </>
                                    )
                                })
                            ) : (
                                <>
                                    <h4>No New Applications</h4>
                                    <Link to='/viewapplications'>
                                        <Button>View New Applications</Button>
                                    </Link>
                                </>
                            )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setModalForPendingApps(false);
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default ViewSlots
