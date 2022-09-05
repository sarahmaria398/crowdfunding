import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function ProjectPage() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    const [userName, setUserName] = useState("");
    const [pledgerNames, setPledgerNames] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data) });

        const total = projectData.pledges
            .filter(pledge => pledge.project_id == id)
            .reduce((sum, pledge) => sum + pledge.amount, 0)
        setTotalAmount(total);

    }, []);


    useEffect(() => {
        if (projectData.owner) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.owner}`)
                .then((results) => { return results.json(); })
                .then((data) => { setUserName(data.username); });

        }
    }, [projectData]);

    useEffect(() => {
        if (projectData.pledges.length > 0)
            for (let i = 0; i <= projectData.pledges.length; i++) {

                if (projectData.pledges?.[i]?.supporter) {
                    fetch(`${process.env.REACT_APP_API_URL}users/${projectData.pledges[i].supporter}`)
                        .then((results) => { console.log(results); return results.json(); })
                        .then((data) => { console.log("data username: ", data.username); setPledgerNames(() => [...pledgerNames, data.username]) })
                }
            }
    }, [projectData]);


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
                    <h3> ${totalAmount} amount raised of ${projectData.goal}</h3>
                    <img src={projectData.image} alt="project" />
                    <h3>Description: {projectData.description}</h3>

                    {projectData.pledges[0] ? <h3>Pledges:</h3> : 'No Pledges yet, be the first!'}

                    <ul>
                        {projectData.pledges.map((pledgeData, index) => {
                            return (
                                <li key={index}>

                                    ${pledgeData.amount} from {pledgerNames[index]}

                                    <br></br>
                                    "{pledgeData.comment}"
                                </li>
                            );
                        })}
                    </ul>

                    <div id="owner-style">
                        <h3 >Creator: </h3>
                        <a href={"/users/" + projectData.owner}><h3>  {userName} </h3></a>
                    </div>
                    {window.localStorage.getItem('token') ? <div>
                        <button onClick={handleDelete}>delete</button>
                        <h5>You will only be able to delete if you own the project!</h5> </div> : ''}

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
