import React from "react";
import { useState } from "react";

import NewProject from "./New-Project";
import Header from "../Shared/Header";
import EditProject from "./Edit-Project";


const getProjects = () => JSON.parse(localStorage.getItem('projects'));

function Projects () {
  const projects = getProjects();
  let  renderedProjects;

  if (projects) {
    renderedProjects = projects.map(p => {
      console.log(p);
      return <SingleProject props={p} key={`project#${p.id}`} />
    });
  }

  

  return ( 
    projects
    ? (
      <table>
        <ProjectHeader />
        <tbody>
          {renderedProjects}
        </tbody>
      </table>
    ) : (
      <Header level={'h3'} text={'You have no Projects yet'} />
    )
  )
}

function ProjectHeader() {
  return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Notes</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
  )
}

function SingleProject ({props}) {
  const [project, setProject] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    priority   : props.priority
  });

  const [edit, setEdit] = useState(false);


  function handleEdit () {
    setEdit(!edit);
  }

  function handleDelete () {
    console.log('Deleting is not yet implemented');
  }

  return (
    <tr>
        
    {edit 
      ? ( <EditProject project={project} /> ) 
      : ( <>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.notes}</td>
            <td>{project.priority}</td>
          </>
      )}
      <td>
        <button onClick={handleEdit}>
          {edit ? 'Save' : 'Edit'}
        </button>
        <button onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Projects;