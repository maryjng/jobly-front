import React, { useContext } from "react"
import { BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom'
import UserContext from "./UserContext"
import Jobs from "./Jobs"
import Companies from "./Companies"
import Signup from "./Signup"
import Profile from "./Profile"
import Login from "./Login"
import Home from "./Home"

function Navbar({login, logout, signup}) {
    const { currentUser } = useContext(UserContext)

    function loggedIn(){
        return(
            <nav>
                <NavLink to="/">Home</NavLink> 

                <NavLink to="/companies">Companies</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/" onClick={logout}>Logout</NavLink>
            </nav>
        )
    }

    function loggedOut(){
        return(
            <nav>
                <NavLink to="/">Home</NavLink> 

                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
            </nav>
        )
    }

    return(
        <div>
            {currentUser ? loggedIn(): loggedOut()}
            
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/companies">
                    <Companies />
                </Route>
                <Route exact path="/jobs">
                    <Jobs />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>

                <Route exact path="/login">
                    <Login login={login}/>
                </Route>
                <Route exact path="/signup">
                    <Signup signup={signup}/>
                </Route>

            </Switch>
        </div>
    )

}

export default Navbar;