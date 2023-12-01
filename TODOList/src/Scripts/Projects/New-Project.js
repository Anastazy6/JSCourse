import React from "react";
import { Title, Description, Notes, Priority, Submit } from './form_elements' ;

import { useState } from 'react';

import { MIN_PROJECT_PRIORITY } from "../Constants/constraints";

import { getProjectId } from "./project";




function NewProject() {
  const [project, setProject] = useState({
    id         : getProjectId(),
    title      : 'Title',
    description: 'Description',
    notes      : 'Notes',
    priority   : MIN_PROJECT_PRIORITY
  });


  const inputProps = {
    project : project,
    onChange: handleChange,
    label   : true
  }

  function handleSubmit (e) {
    e.preventDefault();

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
      <Title       {...inputProps} />
      <Description {...inputProps} />
      <Notes       {...inputProps} />
      <Priority    {...inputProps} />
      <Submit />
    </form>
  );
}


export default NewProject;