import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card, Container, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';
import './Application.css'
import axios from 'axios'
import Loading from '../../components/Loading/Loading';
import Header from '../../components/header/Header';



const Applications = () => {


    const [applications, setApplications] = useState([])
    const [showModal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteApp, setDeleteApp] = useState("")
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [showToast, toastControl] = useState(false)


    const fetchNotes = async () => {
        try {
            setLoading(true)
            const userId = JSON.parse(localStorage.getItem('userDetails'))

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.get(`/api/user/myapplications/${userId._id}`, config)
            if (data) {
                setApplications(data.data)
                setLoading(false)
            }

        } catch (err) {
            setLoading(false)
            console.log("the erroor : ", err.response.data.message)
        }

    }

    const handleDelete = async () => {
        console.log("The app id is : ", deleteApp)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.delete(`/api/user/deleteapplication/${deleteApp}`, config)

            if (data) {
                setDeleteStatus(true)
                toastControl(true)
            }
        } catch (err) {
            console.log("The error in dleting is : ", err)
            toastControl(false)
        }

    }

    useEffect(() => {
        fetchNotes()
    }, [])

    useEffect(() => {
        fetchNotes()
    }, [deleteStatus])
    return (
        <div>
            <Header />
            <Container>
                <MainScreen title='My Applications' />

                
                <Link to='/createapplication'>
                    <Button className='btn btn-secondary createNoteButton'>New Application</Button>
                </Link>
                {applications.length > 0 ?
                    (
                        applications.map((apps, index) => {
                            return (
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Card style={{ margin: 15 }} key={index}>
                                            <Card.Header style={{ display: "flex" }}>
                                                <span className='application'
                                                    style={{
                                                        color: 'black',
                                                        textDecoration: 'none',
                                                        flex: 1,
                                                        cursor: "pointer",
                                                        alignSelf: 'center',
                                                        fontWeight: '800',
                                                        fontSize: '17px'
                                                    }}>

                                                    <Accordion.Header>
                                                        <div>Application ID : {apps._id}</div>
                                                        <br />
                                                        <div className='text-muted'></div>
                                                    </Accordion.Header>


                                                </span>
                                                <div>
                                                    <Button variant='danger'
                                                        className='ms-4'
                                                        onClick={() => {
                                                            setModal(true);
                                                            setDeleteApp(apps._id)
                                                        }}
                                                    >Delete</Button>
                                                </div>

                                                <Modal show={showModal} onHide={() => setModal(false)}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete Application</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are You sure ?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => setModal(false)}>
                                                            Close
                                                        </Button>
                                                        <Button variant="danger" onClick={() => {
                                                            setModal(false);
                                                            handleDelete();
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Card.Header>
                                            <Accordion.Body>
                                                <Card.Body>

                                                    <h4>
                                                        <Badge bg={apps.status === 'Pending' ? 'info' : apps.status === 'Accepted' ? 'warning' : apps.status === 'Approved' ? 'success' : 'danger'} size="sm">
                                                            {apps.status}
                                                            {apps.status === 'Approved' && <p>  </p>}
                                                            {apps.status === 'Approved' ? `Seat No. : ${apps.seatNo}` : ""}
                                                        </Badge>
                                                    </h4>
                                                    <p>Created At : {apps.createdAt.slice(0, 10)}</p>
                                                    <p>Address : {apps.address}</p>
                                                    <p>City {apps.city}</p>
                                                    <p>State : {apps.state}</p>
                                                    <p>Company Name : {apps.companyName}</p>
                                                    <p>Email : {apps.email}</p>
                                                    <p>Phone No : {apps.phoneno}</p>


                                                </Card.Body>
                                            </Accordion.Body>
                                        </Card>
                                    </Accordion.Item>
                                </Accordion>
                            )
                        })
                    ) : ""
                }
                {loading && <Loading />}
            </Container>
            <ToastContainer position='top-end'>
                <Toast bg='success' onClose={() => {
                    toastControl(false)
                }} show={showToast} animation={true}>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully deleted The application</Toast.Body>
                </Toast>
            </ToastContainer>
        </div >
    )
}

export default Applications;
