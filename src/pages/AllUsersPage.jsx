import React, { useState, useEffect } from "react";
import { allProjects } from "../data";
import UserProfile from "../components/UserProfile";

function AllUsersPage() {

    const [users, updateUsers] = useState([])

    // when we mount of our applicaiton, we weant to store the contacent of allprofects in our state 
    useEffect(() => {
        // when we mount our homepage, i want to get our projects from our drf api that we created in our drf module
        // updateUsers(allProjects)
        fetch(`${process.env.REACT_APP_API_URL}users`)
            .then(res => res.json())
            .then(data => updateUsers(data))
    }, [])

    return (
        <div>
            <div id="users">
                <h1>All Users</h1>

                <div id="user-list">
                    {users.map((user, key) => {
                        return <UserProfile key={key} users={user} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllUsersPage;
