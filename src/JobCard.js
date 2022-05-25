import React, { useContext, useState } from "react";
// import { useEffect } from "react/cjs/react.production.min";
import UserContext from "./UserContext"

function JobCard({ id, title, salary, equity, companyName}) {
    const { currentUser, appliedJobs, setAppliedJobs } = useContext(UserContext)

    const checkApplied = appliedJobs.some((jobId)=>jobId === id)

    const [applied, setApplied] = useState(checkApplied())


    function handleClick(e){
        if (!applied){
            setAppliedJobs.push(id)
            setApplied(true)
        }
    }

    return(
        <div>
            <h3>{title}</h3>
            <div>{companyName}</div>
            <ul>
                <li>{salary}</li>
                <li>{equity}</li>
            </ul>
            <button onClick={handleClick}>{ applied ? "Applied" : "Apply" }
            </button>
        </div>
    )
}

export default JobCard;