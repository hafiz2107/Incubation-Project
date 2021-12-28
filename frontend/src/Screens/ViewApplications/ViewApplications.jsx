import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../components/header/Header'
import ApplicationTable from '../../components/Table/Table'

const ViewApplications = () => {

    const [apps, setApps] = useState([])



    return (
        <>
            <Header />
            <div style={{ marginTop: "5em" }}>
                <Container>
                    <ApplicationTable />
                </Container>
            </div>
        </>
    )
}

export default ViewApplications
