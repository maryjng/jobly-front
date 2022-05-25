import React, { useState } from "react"
import { useHistory } from "react-router-dom";

function Signup({ signup }) {
    const history = useHistory()
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        firstName: "",
        lastName: "",
        email: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        await signup(formData.username, formData.password, formData.firstName, formData.lastname, formData.email)

    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} placeholder="username" onChange={handleChange} required/>

            <label>Password</label>
            <input type="text" name="password" value={formData.password} placeholder="password" onChange={handleChange} required />

            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} placeholder="first name" onChange={handleChange} required/>

            <label>Last Name</label>
            <input type="text" name="lastname" value={formData.lastName} placeholder="last name" onChange={handleChange} required/>
            
            <label>Email</label>
            <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange} required/>

            <button type="submit" onSubmit={handleSubmit}>Signup</button>
        </form>
    )
}

export default Signup;