import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function ProjectPage() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data); });
    }, []);

    const handleDelete = async (e) => {
        {
            fetch(
                `${process.env.REACT_APP_API_URL}projects/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.ok) { return (<h3>Successful delete!</h3>) }
                    else { console.log("HTTP request unsuccessful") }
                    return res
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log)
        }
    };



    return (
        <div>
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

                <button onClick={handleDelete}>Delete</button>
                <Link to="/update-project">Update Project</Link>

            </div>
            <div id="pledge">
                <PledgeForm />
            </div>
        </div>


    )
}

export default ProjectPage;
