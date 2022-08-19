import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate()
    // navigate('/')
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const postData = async () => {
        // called async await, promise: when waiting for data, continue doing other processes?
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        return response.json()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password && credentials.email) {
            postData().then((response) => {
                window.localStorage.setItem("token", response.token);
                navigate("/");
            });
        }
    };


    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="Enter email" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit} >Register</button>
        </form>
    );
}

export default RegisterForm;