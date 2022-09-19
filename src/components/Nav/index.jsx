import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
    const navigate = useNavigate()
    const username = window.localStorage.getItem("username")
    const [userData, setUserData] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${username}`)
            .then(res => res.json())
            .then(data => { setUserData(data) })
    }, [username])


    function logOut() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        setUserData("");

    }

    return (
        <section className="navbar">
            <nav className="left-menu">
                <Link className="button" to="/">Game Now</Link>
            </nav>
            <nav className="right-menu">


                {window.localStorage.getItem('username') ?
                    <>
                        <Link className="button" to="/">Welcome {username} </Link>
                        <Link className="button" to="/create-project">Create Project </Link>
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