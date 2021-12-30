import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Table, ProgressBar, Modal, Button } from 'react-bootstrap'
import Header from '../../components/header/Header'

const RecordList = () => {

    const [allApps, setAllApps] = useState([])
    const [singleApp, setSingleApplication] = useState({})
    const [show, setShow] = useState(false)
    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const data = await axios.get('/api/admin/fetchapps', config)

            if (data.status === 200) {
                const allAppsFetched = data.data.apps
                console.log(allAppsFetched)
                setAllApps(allAppsFetched)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header />
            <div style={{ marginTop: '5em' }}>
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Client Name</th>
                                <th>Application ID</th>
                                <th>Progress</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                allApps.map((app, index) => {
                                    return (
                                        <tr onClick={() => {
                                            setShow(true)
                                            setSingleApplication(app)
                                        }}>
                                            <td>{index + 1}</td>
                                            <td>{app.name}</td>
                                            <td>{app._id}</td>
                                            <td colSpan={3}>
                                                {
                                                    app.status !== 'Rejected' ?
                                                        (<Table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Pending</th>
                                                                    <th>Accepted</th>
                                                                    <th>Approved</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan={3}>
                                                                        {app.status !== 'Rejected' ?
                                                                            <ProgressBar style={{ width: '45em' }} animated now={app.status === 'Pending' ? 7 : app.status === 'Accepted' ? 50 : 100} /> :
                                                                            <span>Rejected</span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>) : <h5 style={{ color: 'red' }}>Rejected</h5>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>

                <Modal show={show} fullscreen={true} onHide={() => {
                    setShow(false);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">View Application : {singleApp._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center'>
                        {
                            Object.keys(singleApp).map(key =>
                                <>
                                    <span>
                                        <strong style={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>{key} </strong> <br /> {singleApp[key]}
                                    </span>
                                    <hr />
                                </>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShow(false);
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default RecordList
