import React, { useState } from "react";

import { 
  Title,
  Description,
  Notes,
  Priority,
  Submit
} from './form_elements' ;

import { MIN_PROJECT_PRIORITY } from "../../Constants/constraints";

import * as Storage from '../storage';
import { isProjectValid } from "../validate";
import Header from "../../Shared/Header";



function NewProject({onCreateProject, isVisible}) {
  const [project, setProject] = useState({
    id         : Storage.getProjectId(),
    title      : '',
    description: '',
    notes      : '',
    priority   : MIN_PROJECT_PRIORITY
  });


  const inputProps = {
    project : project,
    onChange: handleChange,
    label   : true
  }


  function handleSubmit (e) {
    e.preventDefault();

    if (isProjectValid(project)) {
      Storage.saveProject(project);
    }
    onCreateProject();
  }


  function handleChange (e) {
    const property = e.target.name;

    let nextProject = {...project};
    nextProject[property] = e.target.value;

    setProject(nextProject);
  }


  return(
    <section
      style={{display: isVisible ? 'grid' : 'none'}}
    >
      
      <Header 
        level='h2'
        text ='Create a new Project'
      />
      
      <form
        onSubmit={handleSubmit}
        className="new-project-form"  
      >
        <Title       {...inputProps} />
        <Priority    {...inputProps} />
        <Description {...inputProps} />
        <Notes       {...inputProps} />
        <Submit />
      </form>

    </section>
  );
}


export default NewProject;