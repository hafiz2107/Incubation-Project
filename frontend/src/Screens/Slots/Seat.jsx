import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Header from '../../components/header/Header'
import './Seat.css'
import { PersonFill } from 'react-bootstrap-icons'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

import { useContext } from 'react'

const Seat = () => {
    const [seat, setSeat] = useState([])
    

    useEffect(() => {
        fetchSeats()
        
    }, [])

    const fetchSeats = async () => {
        try {
            const config = {
                "Content-Type": "application/json"
            }
            const { data } = await axios.get('/api/admin/fetchseats', config)
            setSeat(data.data)
        } catch (err) {
            console.log("THe error in fetching seats are : ", err.response.message)
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
            console.log("THe error in adding seat : ", err.response.message)
        }
    }

    const handleSeatAllocation = (seat) => {

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
                                <Button key={seat._id} id={seat._id} className='seat'
                                    onClick={() => {
                                        handleSeatAllocation(seat)
                                    }}
                                >
                                    {`IN ${index + 1}`}
                                </Button>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default Seat
