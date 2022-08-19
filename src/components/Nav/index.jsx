import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
    const navigate = useNavigate()
    function logOut() {
        localStorage.clear();
        console.log("logged out")
        navigate.push('/')
    }


    return (
        <nav>
            <Link to="/">Logo</Link>
            <Link to="/">Home </Link>
            <Link to="/login">Login </Link>
            <Link to="/create-project">Create Project </Link>
            <Link to="/register">Register </Link>
            <a href="/" onClick={logOut}>Logout</a>
        </nav >
    )
}

export default Nav;