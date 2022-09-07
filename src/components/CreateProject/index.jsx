import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function CreateProject() {
    const token = window.localStorage.getItem("token")
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        date_created: new Date().toJSON()
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProject({ ...project, [id]: value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}projects/`,
                    {
                        method: "post",
                        headers: {
                            'Authorization': `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(project),
                    }
                );
                const data = await response.json();
                console.log(data)
                navigate(`/projects/${data.id}`);
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
            <br></br>
            <br></br>
            <form>
                <h1 id="form-title">Create New Project</h1>
                <div className="form-item">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" placeholder="Title" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" placeholder="Description" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="goal">Goal (in dollars):</label>
                    <input type="number" id="goal" placeholder="Goal" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="image">URL Image:</label>
                    <input type="text" id="image" placeholder="Image Url" onChange={handleChange} />
                </div>
                <div className="form-item">
                    <button type="submit" onClick={handleSubmit}>
                        Create Project
                    </button>
                </div>
            </form>
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
    )
}


export default CreateProject;