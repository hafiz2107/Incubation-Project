import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UseForm = (validate) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })


    useEffect(() => {
        setLoading(false);
    }, [values])


    const [formError, setFormError] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errorsFound = validate(values)
        setFormError(errorsFound)


        if (Object.keys(errorsFound).length === 0) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }
                setLoading(true)
                const email = values.email
                const password = values.password
                const { data } = await axios.post('/api/user/login', { email, password }, config)

                localStorage.setItem('userDetails', JSON.stringify(data))
                setLoading(false);
                data.isAdmin ? navigate('/adminhome') : navigate('/')
            } catch (err) {
                setError(err.response.data.message)
                setLoading(false);
            }

        }
    }

    return { handleChange, values, handleSubmit, formError, error, loading }
}

export default UseForm
