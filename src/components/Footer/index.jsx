import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer() {
    return (
        <footer>
            <Link to="/">Home </Link>
            <Link to="/login">Login </Link>
        </footer>
    )
}

export default Footer;