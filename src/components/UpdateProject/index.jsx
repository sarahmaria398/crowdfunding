import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ProjectCard from "../ProjectCard";

function UpdateProject() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data); });
    }, []);

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
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" placeholder={projectData.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" placeholder={projectData.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="goal">Goal:</label>
                    <input type="time" id="goal" placeholder="Goal" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image">URL Image:</label>
                    <input type="text" id="image" placeholder="Image Url" onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Update Project
                </button>
            </form>

            {/* <div id="project-page">
                <h2>{projectData.title} </h2>
                <h2>Project Goal:{projectData.goal}</h2>
                <img src={projectData.image} alt="project" />
                <h3>Created at: {projectData.date_created}</h3>
                <h3>{projectData.description}</h3>
            </div> */}

            {/* <div id="project-list">
                {projectData.map((project, key) => {
                    return <ProjectCard key={key} projectData={project} />;
                })}
            </div> */}
        </div>
    )

}

export default UpdateProject;