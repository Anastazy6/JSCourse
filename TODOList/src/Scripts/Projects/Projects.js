import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";
import EditProject from "./Edit-Project";

import { getExcerpt } from "../Shared/helpers";

import {
  setDefaultProject,
  getDefaultProject
  } from "./storage";


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
      <table id='all-projects'>
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
          <th colSpan='3'>Actions</th>
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

  function isDefault () {
    return project.id === getDefaultProject();
  }


  function handleEdit () {
    setEdit(!edit);
  }


  function handleDelete () {
    console.log('Deleting is not yet implemented');
  }


  function handleMarkAsDefault () {
    if (isDefault()) return;

    setDefaultProject(project.id);
  }


  return (
    <tr>
        
    {edit 
      ? ( <EditProject project={project} onSave={handleEdit} /> ) 
      : ( <>
            <td>{project.id}</td>
            <td>{getExcerpt(35, project.title)}</td>
            <td>{getExcerpt(35, project.description)}</td>
            <td>{getExcerpt(35, project.notes)}</td>
            <td>{project.priority}</td>
            <td>
            <button 
              className="btn btn-outline-success"
              onClick={handleEdit}
            >
              Edit
            </button>

            </td>
          </>
      )}
      <td>

        <button 
          className="btn btn-outline-danger"  
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          className={`btn btn-outline-${isDefault() ? 'primary' : 'lleuad-lawn'}`}
          onClick={handleMarkAsDefault}
        >
          {isDefault() ? 'Default' : 'Mark as default'}
        </button>
      </td>
    </tr>
  )
}

export default Projects;