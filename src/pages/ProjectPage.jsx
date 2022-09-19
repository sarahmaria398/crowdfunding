import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";
import PledgerDetail from "../components/PledgerDetail";

function ProjectPage() {
    const token = window.localStorage.getItem("token")
    const [projectData, setProjectData] = useState({ pledges: [] });
    const [userName, setUserName] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
            .then((results) => { return results.json(); })
            .then((data) => { setProjectData(data) });

    }, []);

    useEffect(() => {
        if (projectData.owner) {
            fetch(`${process.env.REACT_APP_API_URL}users/${projectData.owner}`)
                .then((results) => { return results.json(); })
                .then((data) => { setUserName(data.username); });
        }
        if (projectData.pledges.length > 0)
            for (let i = 0; i <= projectData.pledges.length; i++) {
                const total = projectData.pledges
                    .reduce((sum, pledge) => sum + pledge.amount, 0)
                setTotalAmount(total);
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
                                    ${pledgeData.amount} from {" "}
                                    <PledgerDetail supporter={pledgeData.supporter} />
                                    {" "} "{pledgeData.comment}"
                                </li>
                            );
                        })}
                    </ul>

                    {window.localStorage.getItem('token') ?
                        <div>

                            <div id="owner-style" >
                                <h3 >Creator: {"    "}
                                    <a id="owner" href={"/users/" + projectData.owner} > {userName} </a></h3>
                            </div>
                        </div>

                        : null}

                    {window.localStorage.getItem("username") === userName ?
                        <a id="button" onClick={handleDelete}>Delete</a>

                        : null}
                    {/* <a className="button" onClick={() => setShowUpdateForm(!showUpdateForm)}>Update</a> */}
                    {/* {showUpdateForm ?
                        <UpdateForm title={projectData.title} description={projectData.description} goal={projectData.goal} image={projectData.image}
                        /> : null} */}



                </div>
                {window.localStorage.getItem('token') ?
                    <div id="pledge">
                        <PledgeForm />
                    </div> :
                    <Link type="button" className="button" to="/login">Login to Pledge!</Link>
                }
            </div>
            <div id="project-page-container-bottom">
                <Link className="button" to="/">View More Projects</Link>
            </div>
        </div>


    )
}

export default ProjectPage;
