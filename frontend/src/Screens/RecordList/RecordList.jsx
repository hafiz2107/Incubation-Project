import axios from 'axios'
import React ,{useState , useEffect} from 'react'
import { Container, Table } from 'react-bootstrap'
import Header from '../../components/header/Header'

const RecordList = () => {
    
    const [allApps, setAllApps] = useState([])

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
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}

export default RecordList
