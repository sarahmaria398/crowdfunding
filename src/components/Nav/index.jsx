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
            <Link to="/">Logo</Link>
            <Link to="/">Home </Link>
            <Link to="/register">Register </Link>
            {window.localStorage.getItem('token') ?
                <> <Link to="/create-project">Create Project </Link>
                    <Link to="/" onClick={logOut}>Logout</Link>
                </>
                : <><Link to="/login">Login </Link></>}
        </nav >
    )
}

export default Nav;