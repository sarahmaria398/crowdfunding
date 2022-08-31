import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Auth } from 'aws-amplify';
// import { useEffect } from "react";

function LoginForm() {
    const navigate = useNavigate()

    // const [error, setError] = useState(null);
    // const [username, setUserName] = useState('');

    // useEffect(() => {
    //     try {
    //         Auth.currentAuthenticatedUser({
    //             bypassCache: false
    //         }).then(user => {
    //             setUserName(user.username);
    //             console.log(`Load additiona setting for: ${user.username}`);
    //         }).catch(err => console.log(err));
    //     }
    //     catch (e) {
    //         setError(e);
    //     }
    // }, []);

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
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit} >Login</button>
        </form>
    );
}

export default LoginForm;