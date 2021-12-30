import React from 'react'

const validateForm = (values) => {
    let formError = {}

    if (!values.username) {
        formError.username = "Username Required"
    }
    if (!values.email.trim()) {
        formError.email = "Email Required"
    } else if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)) {
        formError.email = "Enter a valid Email"
    }

    if(!values.password){
        formError.password = "Password Required"
    }else if(values.password.length < 6){
        formError.password = "Password Must have 6 Characters"
    }
    if(!values.confirmpassword){
        formError.confirmpassword = "Password Confirmation Required"
    }else if(values.confirmpassword !== values.password){
        formError.confirmpassword = "The passwords must be same"
    }
    return formError
}

export default validateForm
