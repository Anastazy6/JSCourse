import React from "react";
import { Title, Description, Notes, Priority, Submit } from './form_elements' ;

import { useState } from 'react';

import { MIN_PROJECT_PRIORITY } from "../Constants/constraints";


import { getProjectId } from "./project";


const defaultProps = {
  id         : getProjectId(),
  title      : 'Title',
  description: 'Description',
  notes      : 'Notes',
  priority   : MIN_PROJECT_PRIORITY
}


function ProjectForm ({props=defaultProps, edit=false}) {
  console.log('Props start')
  console.log(props);
  console.log('Props end');

  const [project, setProject] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    priority   : props.priority
  });


  function handleSubmit (e) {
    e.preventDefault();

    if (props.onSubmit) return props.onSubmit();;

    saveProject();
    
    console.log(localStorage.getItem('projects'));
  }


  function saveProject () { 
    let newProject = {...project};
    let projects = JSON.parse(localStorage.getItem('projects'));

    if (projects) {
      localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
    } else {
      localStorage.setItem('projects', JSON.stringify([newProject]));
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
      {!edit && <Submit /> }
    </form>
  );
}


export default ProjectForm;