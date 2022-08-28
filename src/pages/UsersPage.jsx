import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function UsersPage() {
    const { id } = useParams();

    const [users, updateUsers] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
            .then(res => res.json())
            .then(data => updateUsers(data))
    }, [])

    return (
        <div>
            <div className="user-profile">
                <Link to={`users/${users.id}`}>
                    <img src={users.image} alt="user" />
                    <h3>{users.username}</h3>
                    <h4>{users.bio}</h4>
                </Link>

            </div>
        </div>
    )
}

export default UsersPage;
