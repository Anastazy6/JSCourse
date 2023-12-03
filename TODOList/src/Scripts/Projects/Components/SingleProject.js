import React, { useState } from "react";

import { getExcerpt } from "../../Shared/helpers";

import * as Storage from '../storage';


import EditProject from "./Edit-Project";


function SingleProject ({props, onUpdate}) {
  const [project, setProject] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    priority   : props.priority
  });


  const [edit, setEdit] = useState(false);


  function isDefault () {
    return project.id === Storage.getDefaultProject();
  }


  function handleEdit () {
    setEdit(!edit);
  }


  function handleDelete () {
    Storage.deleteProject(project.id);
    onUpdate()
  }


  function handleMarkAsDefault () {
    if (isDefault()) return;

    Storage.setDefaultProject(project.id);
    onUpdate();
  }


  return (
    <tr>
        
    {edit 
      ? ( <EditProject
            project  ={project} 
            onSave   ={setProject}
            onDiscard={handleEdit}
          /> ) 
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
            
              <button 
                className="btn btn-outline-danger"  
                onClick={handleDelete}
              >
                Delete
              </button>
            
              <button
                className={`btn btn-outline-${isDefault() ? 'primary' : 'lleuad-lawn'}`}
                onClick={handleMarkAsDefault}
              >
                {isDefault() ? 'Default' : 'Mark as default'}
              </button>
            </td>
          </>
      )}

    </tr>
  )
}

export default SingleProject;