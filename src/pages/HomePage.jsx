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
            .then(data => { console.log("data:", data); updateProjectData(data) })
        console.log("hello", projectData)
    }, [])

    console.log("2", projectData)


    return (
        <div>
            <div id="hero-banner">
                <div id="hero-banner-text">
                    <h1>Donate your Time</h1>
                    <p>There is no time like the present to make a difference.<br />Donate today.</p>
                    <a href="#projects" className="button" >Find Projects</a>
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
