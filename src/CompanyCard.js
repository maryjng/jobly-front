import React from "react"

function CompanyCard({ handle, name, description, logoUrl }) {

    return(
        <div>
            <h3>{name}</h3>
            <div>{handle}
                <img src={logoUrl}></img>
            </div>
            <p>{description}</p>
        </div>
    )
}

export default CompanyCard;