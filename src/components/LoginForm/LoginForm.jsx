import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LoginForm() {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
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
            `${process.env.REACT_APP_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        return response
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            postData()
                .then((response) => {
                    if (response.ok) {
                        localStorage.setItem("token", response.token);
                        console.log(response.status);
                        localStorage.setItem('username', credentials.username);
                        console.log("logged in", localStorage.getItem('username'), localStorage.getItem('token'));
                        navigate("/");
                    }
                    else {
                        console.log("log-in failed")
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };


    return (
        <form>
            <br></br>
            <br></br>
            <div>
                <h1 id="form-title">Login</h1>
                <div className="form-item">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Password" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <button type="submit" onClick={handleSubmit} >Login</button>
                </div>
            </div>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </form>
    );
}

export default LoginForm;