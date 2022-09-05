import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PledgeForm() {
    const token = window.localStorage.getItem("token")
    const [pledge, setPledge] = useState({});
    const { id } = useParams();
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPledge((PledgeData) => ({
            ...PledgeData,
            [id]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pledge.amount) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}pledges/`,
                    {
                        method: "post",
                        headers: {
                            'Authorization': `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            amount: pledge.amount,
                            comment: pledge.comment,
                            project_id: parseInt(id)
                        }),
                    }
                );
                const data = await response.json();
                console.log(data)
                navigate("/")
            } catch (err) {
                console.log(err)
            }
        }
    };


    return (
        <div>
            <div >
                <h2 id="pledge-form-title">Pledge to Project:</h2>
            </div>
            <form>
                <div className="form-item">
                    <label htmlFor="Amount">Amount:</label>
                    <input type="number" id="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="comment">Comment:</label>
                    <input type="comment" id="comment" placeholder="Comment" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <button type="submit" onClick={handleSubmit} >Pledge!</button>
                </div>
            </form>
        </div >
    );
}

export default PledgeForm;