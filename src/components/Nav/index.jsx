import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
    const navigate = useNavigate()


    function logOut() {
        window.localStorage.removeItem('token');

    }

    return (
        <nav>
            <Link to="/">Crowdfunding</Link>
            <Link to="/">Home </Link>
            {window.localStorage.getItem('token') ?
                <> <Link to="/create-project">Create Project </Link>
                    <Link to="/" onClick={logOut}>Logout</Link>
                </>
                : <>
                    <Link to="/register">Register </Link>
                    <Link to="/login">Login </Link></>}
        </nav >
    )
}

export default Nav;