import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "./UserContext"
import JoblyApi from "./api"
import JobCard from "./JobCard"

function CompanyDetail() {
    const { currentUser } = useContext(UserContext)
    const handle = useParams()
    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobsForUser() {
        async function getCompany() {
          setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
      }, [handle]);

    // redirect if not logged in
    if (!currentUser) {
        return <Redirect to="/login" />;
      }

    return(
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            {company.jobs.map(job => <JobCard 
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
            )}
        </div>
    )
}

export default CompanyDetail;