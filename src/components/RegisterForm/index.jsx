import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"

function RegisterForm() {
    const navigate = useNavigate()
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
                navigate("/login");
            });
        }
    };


    return (

        <div>

            <form >
                <div >
                    <br></br>
                    <br></br>
                    <h1 id="form-title">Register and Support</h1>
                    <div className="form-item">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" placeholder="Enter email" onChange={handleChange} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div className="form-item">
                        <button type="submit" onClick={handleSubmit} >Register</button>
                    </div>
                </div>
            </form >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default RegisterForm;