import React from "react";
import { Title, Description, Notes, Priority } from './form_elements' ;

import { useState } from 'react';

import { saveProject } from "../storage";
import { isProjectValid } from "../validate";


function EditProject ({project, onSave, onDiscard}) {
  const [updatedProject, setUpdatedProject] = useState(project);

  const formId = `edit-project#${updatedProject.id}-form`


  const inputProps = {
    form: formId,
    project: updatedProject,
    onChange: handleChange,
    label: false
  };


  function handleChange (e) {
    const property = e.target.name;

    let changedProject = {...updatedProject};
    changedProject[property] = e.target.value;

    setUpdatedProject(changedProject);
  }
  

  function handleSave () {
    if (isProjectValid(updatedProject)) {
      saveProject(updatedProject);
      onSave();
    }
  }


  function handleDiscard () {
    onDiscard();
  }
  

  return(

      <>
        <td>
          <form 
            id={formId}
            onSubmit={e => e.preventDefault()}
          />
          <input
            form={formId} 
            type="hidden" 
            name="id" 
            value={updatedProject.id}
          />
        </td>
        <td><Title       {...inputProps} /></td>
        <td><Description {...inputProps} /></td>
        <td><Notes       {...inputProps} /></td>
        <td><Priority    {...inputProps} /></td>
        <td>
          
          <button 
            onClick={handleSave}
            role='button'
            className='btn btn-outline-success'
          >
            Save
          </button>
          
          <button 
            onClick={handleDiscard}
            role='button'
            className='btn btn-outline-danger'
          >
            Discard
          </button>

        </td>
        </>
      
  );
}

export default EditProject;