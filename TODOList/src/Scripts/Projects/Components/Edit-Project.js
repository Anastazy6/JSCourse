import React from "react";
import { Title, Description, Notes, Priority } from './form_elements' ;

import { useState } from 'react';

import { saveProject } from "../../Storage/projects";
import { isProjectValid } from "../validate";


function EditProject ({project, setProject, onCloseForm}) {
  const [updatedProject, setUpdatedProject] = useState(project);

  const formId = `edit-project#${updatedProject.id}-form`;

  console.log(updatedProject);


  const inputProps = {
    form: formId,
    project: updatedProject,
    onChange: handleChange,
    label: false
  };


  function handleChange (e) {
    const property = e.target.name;

    let changedProject = {...updatedProject};

    changedProject[property] = property === 'priority' 
      ? parseInt(e.target.value) 
      : e.target.value;

    setUpdatedProject(changedProject);
  }
  

  function handleSave () {
    if (isProjectValid(updatedProject)) {
      saveProject(updatedProject);
      setProject(updatedProject);
      onCloseForm();
    }
  }


  function handleDiscard () {
    if (confirm('Discard all your changes?')) onCloseForm();
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
          {updatedProject.id}
        </td>
        <td><Title       {...inputProps} /></td>
        <td><Description {...inputProps} /></td>
        <td><Notes       {...inputProps} /></td>
        <td><Priority    {...inputProps} /></td>
        <td
          className="actions-column"
        >
          
          <button 
            onClick={handleSave}
            role='button'
            className='btn btn-outline-success item-action-btn'
          >
            Save
          </button>
          
          <button 
            onClick={handleDiscard}
            role='button'
            className='btn btn-outline-danger item-action-btn'
          >
            Discard
          </button>

        </td>
        </>
      
  );
}

export default EditProject;