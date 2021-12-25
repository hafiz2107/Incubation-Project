import React from 'react'
import { Spinner } from 'react-bootstrap'
import './Loading.css'

const Loading = ({size}) => {
    return (
        <div className='spinnerContainer'>
            <Spinner animation="border"  role="status" />
        </div>
    )
}

export default Loading
