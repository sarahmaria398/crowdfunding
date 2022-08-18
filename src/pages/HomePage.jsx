import React, { useState, useEffect } from "react";
import { allProjects } from "../data";
import ProjectCard from "../components/ProjectCard";

function HomePage() {

    const [projectData, updateProjectData] = useState([])

    // when we mount of our applicaiton, we weant to store the contacent of allprofects in our state 
    useEffect(() => {
        // when we mount our homepage, i want to get our projects from our drf api that we created in our drf module
        // updateProjectData(allProjects)
        fetch(`${process.env.REACT_APP_API_URL}projects`)
            .then(res => res.json())
            .then(data => updateProjectData(data))
    }, [])

    return (
        <div>
            <h3>Browse Projects</h3>
            <div id="project-list">
                {projectData.map((project, key) => {
                    return <ProjectCard key={key} projectData={project} />;
                })}
            </div>
        </div>
    )
}

export default HomePage;
