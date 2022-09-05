import React, { useState } from "react";
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
        return response.json()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            postData().then((response) => {
                // const thisUser = await Parse.User.currentAsync();
                window.localStorage.setItem("token", response.token);
                console.log("logged in")
                // console.log({ thisUser })
                navigate("/");
            });
        }
    };


    return (
        <form>
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
        </form>
    );
}

export default LoginForm;