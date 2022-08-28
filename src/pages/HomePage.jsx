import React, { useState, useEffect } from "react";
import { allProjects } from "../data";
import ProjectCard from "../components/ProjectCard";

function HomePage() {
    const [projectData, updateProjectData] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
            .then(res => res.json())
            .then(data => { updateProjectData(data) })
    }, [])

    if (!projectData) {
        return "Projects loading..."
    }

    return (
        <div>
            <div id="hero-banner">
                <div id="hero-banner-text">
                    <h1>Donate Today</h1>
                    <p>Inspiring Health and Fitness in your Community.</p>
                    <a href="#projects" className="button" >Find Local Projects</a>
                </div>
            </div>
            <div id="projects">
                <h1>Browse Projects</h1>

                <div id="project-list">
                    {projectData.map((project, index) => {
                        return <ProjectCard key={index} projectData={project} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomePage;
