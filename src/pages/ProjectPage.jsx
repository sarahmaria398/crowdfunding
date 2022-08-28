import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function ProjectPage() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    const [userName, setUserName] = useState("");
    const [pledgerName, setPledgerName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data); });
    }, []);

    useEffect(() => {
        if (projectData.owner) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.owner}`)
                .then((results) => { return results.json(); })
                .then((data) => { setUserName(data.username); });
        }
    }, [projectData]);

    useEffect(() => {
        if (projectData.pledges.supporter) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.pledges.supporter}`)
                .then((results) => { return results.json(); })
                .then((data) => { setPledgerName(data.username); });
        }
    }, [projectData]);

    console.log({ pledgerName })


    const handleDelete = (e) => {
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
                    if (res.ok) { console.log("HTTP request successful"); navigate("/") }
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
            <h2 id="project-title">{projectData.title} </h2>
            <div id="project-page-container">
                <div id="project-page">
                    <h2>Project Goal: ${projectData.goal}</h2>
                    <img src={projectData.image} alt="project" />
                    <h3>{projectData.description}</h3>


                    <h3>Pledges:</h3>
                    <ul>
                        {projectData.pledges.map((pledgeData, key) => {
                            return (
                                <li key={key}>
                                    ${pledgeData.amount} from {pledgerName} {pledgeData.supporter}
                                    <br></br>
                                    "{pledgeData.comment}"
                                </li>
                            );
                        })}
                    </ul>

                    <h3>Owner: {userName}</h3>

                </div>
                {window.localStorage.getItem('token') ?
                    <div id="pledge">
                        <PledgeForm />
                    </div> :
                    <Link type="button" to="/login">Login to Pledge!</Link>
                }
            </div>
            <div id="project-page-container-bottom">
                <Link to="/">View More Projects</Link>
            </div>
        </div>


    )
}

export default ProjectPage;
