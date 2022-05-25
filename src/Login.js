import React, { useState } from "react"
import { useHistory } from "react-router-dom";

function Login({ login }) {
    const history = useHistory()
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    async function handleSubmit(e){
        e.preventDefault()
        await login(formData.username, formData.password)
        history.push('/')
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

            <button type="submit" onSubmit={handleSubmit}>Login</button>
        </form>
    )
}

export default Login;