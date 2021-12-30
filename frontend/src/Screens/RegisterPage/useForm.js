import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useForm = (validate) => {


    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    })
    const navigate = useNavigate()

    const [formError, setFormError] = useState({})
    const [loading, setLoading] = useState(false)
    
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
                        "Content-type": "application/json",
                    },
                }

                setLoading(true)
                const userName = values.username
                const email = values.email
                const password = values.password

                const { data } = await axios.post('/api/user', { userName, email, password }, config)
                setLoading(false)
                localStorage.setItem("userDetails", JSON.stringify(data))
                navigate('/login')
            } catch (err) {
                console.log(err.response.data.message)
                setLoading(false)
            }
        }


    }

    return { handleChange, values, handleSubmit, formError ,loading }
}

export default useForm
