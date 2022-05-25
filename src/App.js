import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./UserContext"
import JoblyApi from "./api"
import Navbar from "./Navbar"
import useLocalStorageState from "./hooks/useLocalStorageState"
import jwt from "jsonwebtoken";

export const STORETOKEN = "jobly-token";


function App() {
    // Using testuser token from JoblyApi ? 
    const [token, setToken] = useLocalStorageState(STORETOKEN)
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState(null)

    useEffect(() => {
        //Whenever token changes, use token to set currentUser state. If fails, set it to null.
        //also set state for user's applied jobs
        async function getCurrentUser() {
            if (token) {
              try {
                let { username } = jwt.decode(token);
                JoblyApi.token = token;
                let currentUser = await JoblyApi.getUser(username);
                setCurrentUser(currentUser);
                setAppliedJobs(currentUser.applications)
              } catch (e){
                  console.log(e.stack);
                  setCurrentUser(null)
              }
            }
            setInfoLoaded(true)
            }
            setInfoLoaded(false);
            getCurrentUser();
        }, [token]
    );

    async function login(data) {
        let token = await JoblyApi.login(data)
        setToken(token);
    }

    async function signup(data) {
        let token = await JoblyApi.signup(data)
        setToken(token);
    }

    function logout() {
        setCurrentUser(null);
        setToken(null);
      }

    if (!infoLoaded) return <LoadingSpinner />;


    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, appliedJobs, setAppliedJobs}}>
            <BrowserRouter>
                <Navbar login={login} signup={signup} logout={logout} />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;