import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

function DeleteProject(props) {
    const { deleteId } = props;
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
                    // TODO: I WANTED IF SUCCESFFUL TO JUST RE ROUTE TO HOME PAGE, BUT IT DIDNT WORK.SAD FACE.
                    if (res.ok) { return (<h3>Successful delete!</h3>) }
                    else { console.log("HTTP request unsuccessful") }
                    return res
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log)
        }
    };

}

export default DeleteProject;

