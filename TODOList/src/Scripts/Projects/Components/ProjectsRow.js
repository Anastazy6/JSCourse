import React, { useState } from "react";

import { getExcerpt } from "../../Shared/helpers";

import * as Storage from '../../Storage/projects';


import EditProject from "./Edit-Project";


function ProjectsRow ({props, onUpdate, onVisitProject}) {
  const [project, setProject] = useState({
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    priority   : props.priority,
    tasks      : props.tasks
  });

  console.log(onVisitProject);

  const [edit, setEdit] = useState(false);


  function isDefault () {
    return localStorage.getItem('defaultProject') && 
        project.id === Storage.getDefaultProject().id;
  }


  function handleCloseForm (e) {
    e.stopPropagation();
    setEdit(false);
  }


  function handleOpenForm (e) {
    e.stopPropagation();
    setEdit(!edit);
  }


  function handleDelete (e) {
    e.stopPropagation();
    if (confirm(
      'Are you sure? Deleting a project is an action which cannot be reverted!'
    )) {
      Storage.deleteProject(project.id);
      onUpdate();
    }
  }


  function handleMarkAsDefault (e) {
    e.stopPropagation();
    if (isDefault()) return;

    Storage.setDefaultProject(project.id);
    onUpdate();
  }


  return (
    <tr
      onClick={() => edit ? null : onVisitProject(project.id)}
      className='clickable'
    >
        
    {edit 
      ? ( <EditProject
            project    ={project} 
            setProject ={setProject}
            onCloseForm={handleCloseForm}
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
                onClick={handleOpenForm}
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

export default ProjectsRow;