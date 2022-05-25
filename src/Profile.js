import React, { useContext, useState } from "react"
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext"
import JoblyApi from "./api"

function Profile() {
    const [currentUser, setCurrentUser] = useContext(UserContext)

    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password:""
    })

    async function handleSubmit(e){
        e.preventDefault()
        let updatedUser = await JoblyApi.updateProfile(currentUser.username, formData)
        setCurrentUser(updatedUser)
    }

    function handleChange(e){
        const {value, name} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    // redirect if not logged in
    if (!currentUser) {
        return <Redirect to="/login" />;
      }

    return(
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <div>{currentUser.username}</div>
            
            <label>First Name</label>
            <input type="text" value={formData.firstName} onChange={handleChange} />

            <label>Last Name</label>
            <input type="text" value={formData.lastName} onChange={handleChange} />

            <label>Email</label>
            <input type="email" value={formData.email} onChange={handleChange} />

            <label>Password</label>
            <input type="text" value={formData.password} onChange={handleChange} placeholder="Confirm password to make changes"/>

            <button type="submit" onClick={handleSubmit}>Update Profile</button>
        </form>
    )
}

export default Profile;