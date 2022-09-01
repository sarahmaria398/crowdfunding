import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";
// import { CurrentUser } from "../Context";

function ProjectPage() {
    console.log(" ")
    console.log(" ")
    console.log(" ")
    console.log(" ")
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    const [userName, setUserName] = useState("");
    const [pledgerNames, setPledgerNames] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    // const User = useContext(CurrentUser);

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
        if (projectData.pledges.length > 0)
            for (let i = 0; i <= projectData.pledges.length; i++) {

                if (projectData.pledges?.[i]?.supporter) {
                    fetch(`${process.env.REACT_APP_API_URL}users/${projectData.pledges[i].supporter}`)
                        .then((results) => { console.log(results); return results.json(); })
                        .then((data) => { console.log("data username: ", data.username); setPledgerNames(() => [...pledgerNames, data.username]) })
                }

                if (projectData.pledges?.[i]?.amount) {
                    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
                        .then((results) => { console.log(results); return results.json(); })
                        .then((data) => { setTotalAmount(data.pledges.amount); console.log("total amount", totalAmount) })
                }
            }
    }, [projectData]);

    console.log("project data pledges", projectData.pledges)
    console.log("pledgers name", pledgerNames)

    // TODO: use my delete, render it conditionally: only if the logged in user is the project owner 


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
                    {/* TODO: how to show variable which capture the continual increase of Pledge amount */}
                    <h3>{totalAmount}amount raised of ${projectData.goal}</h3>
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
                        <a href={"/users/" + projectData.owner}><h3>  {userName}</h3></a>
                    </div>

                    <button onClick={handleDelete}>delete</button>
                    <h5>You will only be able to delete if you own the project!</h5>

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
