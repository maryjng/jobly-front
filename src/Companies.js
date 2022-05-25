import React, { useState, useEffect, useContext } from "react"
import { Redirect } from "react-router-dom"
import UserContext from "./UserContext"
import JoblyApi from "./api"
import SearchForm from "./SearchForm"
import CompanyCard from "./CompanyCard"

function Companies() {
    const currentUser = useContext(UserContext)
    const allCompanies = JoblyApi.getAllCompanies()
    const [companies, setCompanies] = useState(allCompanies)

    function search(name){ 
        let res = JoblyApi.searchCompanies(name) 
        setCompanies(res);
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
        <SearchForm search={search}/>
        {companies.map(c => (
            <CompanyCard 
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
                />
             ))}
        </>
    )
}

export default Companies;