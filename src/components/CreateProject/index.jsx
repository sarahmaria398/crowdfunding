// import React, { useState } from "react";
// import { useNavigate, useParams, Link, Navigate } from "react-router-dom";

// function CreateProject() {
//     const token = window.localStorage.getItem("token")
//     const [project, setProject] = useState({
//         title: "",
//         description: "",
//         goal: "",
//         image: "",
//     });

//     const inputs = [
//         {
//             id: 1,
//             name: "title",
//             type: "text",
//             placeholder: "Title"
//         },
//         {
//             id: 2,
//             name: "description",
//             type: "text",
//             placeholder: "Description"
//         },
//         {
//             id: 3,
//             name: "goal",
//             type: "text",
//             placeholder: "Goal"
//         },
//         {
//             id: 4,
//             name: "image",
//             type: "text",
//             placeholder: "Image URL"
//         }
//     ]

//     const { id } = useParams;
//     const navigate = useNavigate;

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setProject((projectData) => ({
//             ...projectData,
//             [id]: value,
//         }));
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (token && inputs)
//             try {
//                 const response = await fetch(
//                     `${process.env.REACT_APP_API_URL}projects/`,
//                     {
//                         method: "post",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                             title: project.title,
//                             description: project.description,
//                             goal: project.goal,
//                             image: project.image
//                         }),
//                     }
//                 );
//                 const data = await response.json();
//                 console.log(data)
//                 navigate(`/project`);
//             } catch (err) {
//                 console.log(err)
//             }
//     };

//     if (!token || token == null) {
//         return (
//             <Link to="/login">Please login</Link>
//         )
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 {inputs.map((input, key) => {
//                     return (
//                         <div key={`${key}-${input.id}`}>
//                             <label htmlFor={input.id}>
//                                 {input.name}
//                             </label>
//                             <input>
//                                 type={input.type}
//                                 id={input.id}
//                                 placeholder={input.placeholder}
//                                 onChange={handleChange}
//                             </input>
//                         </div>
//                     )
//                 })}
//                 <button type="submit" onClick={handleSubmit}>
//                     Create Project
//                 </button>
//             </form>
//         </div>
//     )
// }


// export default CreateProject;