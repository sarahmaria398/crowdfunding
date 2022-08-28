import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function ProjectPage() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    // the variable and the function to call when state changes. must have empty array of pledges here so that the map function can run (which is call on Home Page)
    const [userName, setUserName] = useState("");
    const [pledgerName, setPledgerName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data); });
    }, []);
    // when page loads, go obtain the information on route about, return the result and then call function set Project Data to load function


    useEffect(() => {
        if (projectData.owner) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.owner}`)
                .then((results) => { return results.json(); })
                .then((data) => { setUserName(data.username); });
        }
    }, [projectData]);
    // run this only when project Data has successfully been fetched, and obtain the user information of the project Data owner
    // return the result and call set Username to trigger state change, but only on the username of the User


    useEffect(() => {
        if (projectData.pledges.supporter) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.pledges.supporter}`)
                .then((results) => { return results.json(); })
                .then((data) => { setPledgerName(data.username); });
        }
    }, [projectData]);

    console.log({ pledgerName })

    if (!projectData.pledges) {
        return "This Project is yet to have some pledges, be the first!"
    }

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
                    // we navigate to home after a successful deletion
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
                    <h2>Project Goal:{projectData.goal}</h2>
                    <img src={projectData.image} alt="project" />
                    <h3>Created at: {projectData.date_created}</h3>
                    <h3>{projectData.description}</h3>
                    <h3>Pledges:</h3>
                    <ul>
                        {projectData.pledges.map((pledgeData, key) => {
                            return (
                                <li key={key}>
                                    {pledgeData.amount} from {pledgerName} {pledgeData.supporter}
                                    <br></br>
                                    {pledgeData.comment}
                                </li>
                            );
                        })}
                    </ul>

                    <h3>Owner: {userName}</h3>
                    {/* //we call the variable in which we saved the username of the User object which we called on second use effect */}
                    {window.localStorage.getItem('token') ?
                        <button onClick={handleDelete}>Delete</button> :
                        ''}
                    {/* <Link to="/update-project">Update Project</Link> */}

                </div>
                <div id="pledge">
                    <PledgeForm />
                </div>
            </div>
        </div>


    )
}

export default ProjectPage;
