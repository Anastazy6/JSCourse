import React from "react";
import { Title, Description, Notes, Priority, Submit } from './form_elements' ;

import { useState } from 'react';

import { MIN_PROJECT_PRIORITY } from "../Constants/constraints";
import Project from "./project";

function ProjectForm () {
  const [project, setProject] = useState({
    title      : 'Title',
    description: 'Description',
    notes      : 'Notes',
    priority   : MIN_PROJECT_PRIORITY
  })

  function handleSubmit (e) {
    e.preventDefault();

    saveProject()
    
    console.log(localStorage.getItem('projects'));
  }


  function saveProject () { 
    let newProject = new Project(project).serialize();
    let projects = JSON.parse(localStorage.getItem('projects'));

    if (projects) {
      localStorage.setItem('projects', JSON.stringify([...projects, {newProject}]));
    } else {
      localStorage.setItem('projects', JSON.stringify([{newProject}]));
    }
  }


  function handleChange (e) {
    const property = e.target.name;

    let nextProject = {...project};
    nextProject[property] = e.target.value;

    setProject(nextProject);
  }

  return(
    <form
      onSubmit={handleSubmit}
    >
      <Title       project={project} onChange={handleChange} />
      <Description project={project} onChange={handleChange} />
      <Notes       project={project} onChange={handleChange} />
      <Priority    project={project} onChange={handleChange} />
      <Submit />
    </form>
  );
}


export default ProjectForm;