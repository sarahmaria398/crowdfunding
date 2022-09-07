import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
    const navigate = useNavigate()


    function logOut() {
        window.localStorage.removeItem('token');

    }

    return (
        <section className="navbar">
            <nav className="left-menu">
                <Link className="button" to="/">Game Now</Link>
            </nav>
            <nav className="right-menu">
                <Link className="button" to="/">Home </Link>

                {window.localStorage.getItem('token') ?
                    <> <Link className="button" to="/create-project">Create Project </Link>
                        <Link className="button" to="/" onClick={logOut}>Logout</Link>
                    </>
                    : <>
                        <Link className="button" to="/register">Register </Link>
                        <Link className="button" to="/login">Login </Link></>}
            </nav >
        </section >
    )
}

export default Nav;