import React from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

function UserProfile(props) {
    const { users } = props;
    return (
        <div className="user-profile">
            <Link to={`users/${users.id}`}>
                <img src={users.image} alt="user" />
                <h3>{users.username}</h3>
                <h4>{users.bio}</h4>
            </Link>

        </div>
    )
}

export default UserProfile;

