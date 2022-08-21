import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function DeleteProject(id) {


    const handleDelete = async (e) => {
        {
            fetch(
                `${process.env.REACT_APP_API_URL}projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    )

}

export default DeleteProject;

