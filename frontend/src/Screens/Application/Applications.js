import React,{useEffect,useState} from 'react'
import {  Badge, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';
import './Application.css'
import axios from 'axios'

const Applications = () => {
    const navigate = useNavigate()

    const [notes, setNotes] = useState([])

    const fetchNotes = async() =>{
        const {data} = await axios.get('/myapplications')
        setNotes(data)
    } 

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div>
            <Container>
                <MainScreen title='My Applications' />
                <Link to='/createapplication'>
                    <Button className='btn btn-secondary createNoteButton'>New Application</Button>
                </Link>

                {
                    notes.map((eachNote , index) => {
                        return (
                            
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
                                                
                                             
                                                {eachNote.title}
                                            
                                        </span>
                                        <div>
                                            <Button variant='danger' onClick={() => {
                                                console.log("Each Note : ", eachNote)
                                                navigate(`/deleteapplication/${eachNote._id}`)
                                            }}>Delete</Button>
                                        </div>
                                    </Card.Header>
                                   
                                        <Card.Body>

                                            <h4>
                                                <Badge bg='danger' size="sm">
                                                    {eachNote.category}
                                                </Badge>
                                            </h4>

                                            <blockquote className='blockquote mb-0'>
                                                <p>
                                                    {eachNote.content}
                                                </p>
                                                <footer className='blockquote-footer'>Created on : Date</footer>

                                            </blockquote>
                                        </Card.Body>
                                </Card>
                            
                        )
                    })
                }

            </Container>
        </div>
    )
}

export default Applications;
