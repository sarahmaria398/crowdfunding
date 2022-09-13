import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProjectCard from "../ProjectCard";

function UpdateForm({ title, description, goal, image }) {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectData({ ...projectData, [id]: value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}projects/${id}`,
                    {
                        method: "put",
                        headers: {
                            'Authorization': `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(projectData),
                    }
                );
                const data = await response.json();
                console.log(data)
                navigate(`/projects/${id}`);
            } catch (err) {
                console.log(err)
            }
        }
    };

    if (!token || token == null) {
        return (
            <Link to="/login">Please login</Link>
        )
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="goal">Goal:</label>
                    <input type="number" id="goal" value={goal} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image">URL Image:</label>
                    <input type="text" id="image" value={image} onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Update Project
                </button>
            </form>
        </div>
    )

}

export default UpdateForm;