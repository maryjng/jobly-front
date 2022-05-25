import React, { useState, useEffect, useContext } from "react"
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext"
import JoblyApi from "./api"
import JobCard from "./JobCard"
import SearchForm from "./SearchForm"


function Jobs() {
    const currentUser = useContext(UserContext)
    const allJobs = JoblyApi.getAllJobs()
    const [jobs, setJobs] = useState(allJobs)

    function search(name){
        let res = JoblyApi.searchJobs(name)
        setJobs(res)
    }

    useEffect(() => {
        search()
    }, [])

    // redirect if not logged in
    if (!currentUser) {
        return <Redirect to="/login" />;
      }

    return(
        <>
            <SearchForm search={search} />
            {jobs.map(job => <JobCard 
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
            )}
        </>
    )
}

export default Jobs;