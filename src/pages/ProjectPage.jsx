import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data); });
    }, []);


    return (
        <div id="project-page">
            <h2>{projectData.title} </h2>
            <h2>Project Goal:{projectData.goal}</h2>
            <img src={projectData.image} alt="project" />
            <h3>Created at: {projectData.date_created}</h3>
            <h3>{projectData.description}</h3>
            <h3>Pledges:</h3>
            <ul>
                {projectData.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            <h3>Owner: {projectData.owner}</h3>
        </div>
    )
}

export default ProjectPage;
