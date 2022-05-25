import React, { useState } from "react"

function SearchForm({ search }) {

    const [searchField, setSearchField] = useState("")


    function handleSubmit(e){
        e.preventDefault()
        search(searchField.trim)
        setSearchField(searchField.trim)
    }

    function handleChange(e){
        e.preventDefault()
        setSearchField(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={searchField} name="searchField" placeholder="Enter search term" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchForm;