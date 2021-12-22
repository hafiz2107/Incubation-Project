import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './Mainscreen.css'
const MainScreen = ({ title }) => {
    return (

        <div className='mainBackground'>
            <Container>
                <Row>
                    <div className='title'>

                        {
                            title && (
                                <>
                                    <div>
                                        <h1 className='heading'>{title}</h1>
                                        <hr />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Row>
            </Container>
        </div>

    )
}

export default MainScreen
