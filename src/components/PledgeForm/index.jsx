import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PledgeForm(props) {
    const { projectData } = props;

    const navigate = useNavigate()
    const token = window.localStorage.getItem("token")
    const [pledges, setPledges] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPledges((pledges) => ({
            ...pledges,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}pledges/`,
            {
                method: "post",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pledges),
            }
        );
        return response.json()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pledges.amount) {
            postData().then((response) => {
                window.localStorage.setItem("token", response.token);
                console.log("pledge created")
                navigate("/projects/${id}");
            });
        }
    };


    return (
        <form>
            <h2>Pledge to Project:</h2>
            <div>
                <label htmlFor="Amount">Amount:</label>
                <input type="time" id="amount" placeholder="Enter amount" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input type="comment" id="comment" placeholder="Comment" onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit} >Pledge!</button>
        </form>
    );
}

export default PledgeForm;