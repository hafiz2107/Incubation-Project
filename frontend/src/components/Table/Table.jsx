import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button, Modal, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Table.css'
import { ApplicationContext } from '../../Store/ApplicationContext'

const ApplicationTable = () => {


    const { setApplicationDetails } = useContext(ApplicationContext)
    const [apps, setApps] = useState([])
    const [singleApp, setSingleApp] = useState({})

    const [newApps, setNewApps] = useState([])
    const [show, setShow] = useState(false);

    const [pendingApps, setPendingApps] = useState([])
    const [pendingModal, setPendingModal] = useState(false)
    const [pendingSingleApp, setPendingSingleApp] = useState({})


    useEffect(() => {
        fetchApplications()
    }, [setApps])


    const fetchApplications = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const data = await axios.get('/api/admin/fetchapps', config)

            if (data.status === 200) {
                const allApps = data.data.apps
                const newApps = allApps.filter((app) => app.status === 'Pending')
                const pendingApplications = allApps.filter((app) => app.status === 'Accepted')
                setNewApps(newApps)
                setPendingApps(pendingApplications)
                setApps(allApps)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Function to handle Accept of new Application
    const handleAccept = async (appId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.patch(`/api/admin/acceptapplication/${appId}`, config)
            fetchApplications()
        } catch (err) {
            console.log("the error in updating app is :", err)
        }
    }


    // Handle The rejection of rejected applications
    const handleReject = async (appId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.patch(`/api/admin/rejectapplication/${appId}`, config)
            const rejectedApplications = newApps.filter(app => app._id !== appId)
            setNewApps(rejectedApplications)
        } catch (err) {
            console.log("the error in updating app is :", err)
        }
    }

    return (
        <>
            <Row>
                <div style={{ textAlign: "center" }}>
                    <h3 className='mb-4'>
                        <u>
                            New Applications
                        </u>
                    </h3>

                    {
                        newApps.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Application ID</th>
                                        <th>App. Status</th>
                                        <th>Client Name</th>
                                        <th>Client City</th>
                                        <th>Client State</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                {
                                    newApps.map((app, index) => {
                                        return (
                                            <>
                                                <tbody key={app._id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{app._id}</td>
                                                        <td>
                                                            <Badge bg={app.status === 'Pending' ? 'warning' : 'success'}>{app.status}</Badge>
                                                        </td>
                                                        <td>{app.name}</td>
                                                        <td>{app.city}</td>
                                                        <td>{app.state}</td>
                                                        <td style={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                // handleViewApplication(app._id);
                                                                setShow(true);
                                                                setSingleApp(app)
                                                            }}>
                                                            View Application</td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        )
                                    })
                                }

                                {
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
                                                handleReject(singleApp._id);
                                            }}>
                                                Reject
                                            </Button>
                                            <Button variant="primary" onClick={() => {
                                                setShow(false);
                                                handleAccept(singleApp._id);
                                            }}>
                                                Accept
                                            </Button>

                                            <Button variant="secondary" onClick={() => {
                                                setShow(false);
                                            }}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                }
                            </Table>
                        ) : <h3 style={{ color: 'red' }}>No New Applications</h3>
                    }
                </div>
            </Row>

            <hr />
            {/* Pending Applications */}
            <Row>
                <div style={{ textAlign: "center" }}>
                    <h3>
                        <u>Pending Applications</u>
                    </h3>
                    {
                        pendingApps.length > 0 ?
                            (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Sl No</th>
                                            <th>Application ID</th>
                                            <th>App. Status</th>
                                            <th>Client Name</th>
                                            <th>Client City</th>
                                            <th>Client State</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    {
                                        pendingApps.map((app, index) => {
                                            return (
                                                <>
                                                    <tbody key={app._id}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{app._id}</td>
                                                            <td>
                                                                <Badge bg={app.status === 'Pending' ? 'warning' : 'success'}>{app.status}</Badge>
                                                            </td>
                                                            <td>{app.name}</td>
                                                            <td>{app.city}</td>
                                                            <td>{app.state}</td>
                                                            <td style={{ cursor: 'pointer' }}
                                                                onClick={() => {

                                                                    setPendingModal(true);
                                                                    setPendingSingleApp(app)
                                                                }}>
                                                                View Application</td>
                                                        </tr>
                                                    </tbody>
                                                </>
                                            )

                                        })
                                    }
                                    {
                                        <Modal show={pendingModal} fullscreen={true} onHide={() => {
                                            setPendingModal(false)
                                        }}>
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-custom-modal-styling-title">View Application : {pendingSingleApp._id}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className='text-center'>
                                                {
                                                    Object.keys(pendingSingleApp).map(key =>
                                                        <>
                                                            {
                                                                key === 'pic' ?
                                                                    (
                                                                        <>
                                                                            <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>Company Logo </strong> <br />
                                                                            <img src={pendingSingleApp[key]} alt="" style={{ height: '200px' }} />
                                                                            <hr />
                                                                        </>
                                                                    ) :
                                                                    <>
                                                                        <span>
                                                                            <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {pendingSingleApp[key]}
                                                                        </span>
                                                                        <hr />
                                                                    </>
                                                            }

                                                        </>
                                                    )
                                                }
                                            </Modal.Body>
                                            <Modal.Footer>


                                                <Button variant="primary" onClick={() => {
                                                    setPendingModal(false)
                                                    setApplicationDetails(pendingSingleApp)
                                                }}>
                                                    <Link to='/bookslot'>Book Slot</Link>

                                                </Button>

                                                <Button variant="secondary" onClick={() => {
                                                    setPendingModal(false)
                                                }}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    }
                                </Table>
                            ) :
                            <h3 style={{ color: 'red' }}>No Applications</h3>
                    }
                </div>
            </Row>
        </>
    )
}

export default ApplicationTable
