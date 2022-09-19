import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function UsersPage() {
    const { id } = useParams();
    const [users, updateUsers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
            .then(res => res.json())
            .then(data => updateUsers(data))
    }, [])

    if (window.localStorage.getItem('token')) {
        return (
            <div>
                <div className="user-profile">
                    <img src={users.image} alt="user" />
                    <h3>{users.username}</h3>
                    <h4>{users.bio}</h4>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
    else { return <div><p>No data for you!</p><br></br><Link className="button" to="/login">Please Log in</Link><br></br></div> }
}

export default UsersPage;
