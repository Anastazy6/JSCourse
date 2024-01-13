import React, { useState } from "react";

import { getExcerpt } from "../../Shared/helpers";

import * as Storage from '../../Storage/projects';


import EditProject from "./Edit-Project";

import { useEdits, useEditsDispatch } from "../../Contexts/EditsContext";


function ProjectsRow ({ props, onUpdate, onVisitProject }) {
  const [project, setProject] = useState({ 
    id         : props.id,
    title      : props.title,
    description: props.description,
    notes      : props.notes,
    priority   : props.priority,
    tasks      : props.tasks
  });

  const activeEdits         = useEdits();
  const dispatchActiveEdits = useEditsDispatch();
  
  const [edit, setEdit] = useState(false);


  function isDefault () { 
    return localStorage.getItem('defaultProject') && 
        project.id === Storage.getDefaultProject().id;
  }


  function handleCloseForm () { 
    dispatchActiveEdits({
      type: 'closed_edit'
    });

    setEdit(false);
  }


  function handleOpenForm (e) { 
    e.stopPropagation();

    dispatchActiveEdits({ 
      type: 'opened_edit'
    });

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
      onClick  = { () => activeEdits > 0 ? null : onVisitProject(project.id) }
      className='clickable'
    >
        
    { edit 
      ? ( <EditProject
            project    ={ project } 
            setProject ={ setProject }
            onCloseForm={ handleCloseForm }
          /> ) 
      : ( <>
            <td>{ project.id }</td>
            <td>{ getExcerpt(35, project.title) }</td>
            <td>{ getExcerpt(35, project.description) }</td>
            <td>{ getExcerpt(35, project.notes) }</td>
            <td>{ project.priority }</td>
            <td className="actions-column">
            
              <button 
                className="btn btn-outline-success item-action-btn"
                onClick={ handleOpenForm }
              >
                Edit
              </button>
            
              <button 
                className="btn btn-outline-danger item-action-btn"  
                onClick={ handleDelete }
              >
                Delete
              </button>
            </td>
          </>
      )}

      <td className="actions-column">
        <button
          className={ `
            btn
            btn-outline-${ isDefault() ? 'primary' : 'lleuad-lawn' }
            item-action-btn
          ` }
          onClick={ handleMarkAsDefault }
        >
          { isDefault() ? 'Default' : 'Mark' }
        </button>
      </td>

    </tr>
  );
}

export default ProjectsRow;