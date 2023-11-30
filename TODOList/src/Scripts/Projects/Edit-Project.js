import React from "react";
import { Title, Description, Notes, Priority } from './form_elements' ;

import { useState } from 'react';




function EditProject ({project}) {
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
  

  function handleSubmit (e) {
    e.preventDefault();

  }
  

  return(

      <>
        <td>
          <form 
            id={formId}
            onSubmit={handleSubmit}
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
        </>
      
  );
}

export default EditProject;