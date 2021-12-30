import React from 'react'

const validateForm = (values) => {
    let formError = {}

    if(!values.email.trim()){
        formError.email = "Email Required"
    }else if(!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)){
        formError.email = "Enter a valid Email"
    }
    if(!values.password){
        formError.password = "Password Required"
    }else if(values.password.length < 6){
        formError.password = "Minimum 6 characters required"
    }

    return formError
}

export default validateForm
