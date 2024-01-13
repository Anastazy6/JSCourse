import React, {
  useState,
} from "react";

import { useProject } from "../../Contexts/ProjectContext";

import { saveTask } from "../../Storage/tasks";

import { isTaskValid } from '../validate';
import {
  Title,
  Priority,
  Description,
  Notes,
  DueDate,
  Status
} from './formElements';


function EditTask ({task, setTask, onCloseForm}) {
  const project = useProject();

  const [updatedTask, setUpdatedTask] = useState({
    ...task,
  });


  const formId = `edit-task#${task.id}-form`;

  const inputProps = {
    form    : formId,
    task    : updatedTask,
    onChange: handleChange,
    label   : false
  }


  function handleChange (e) {
    const property = e.target.name;
    const nextValue = e.target.value

    let changedTask = {...updatedTask};
    changedTask[property] = property === 'priority'
      ? parseInt(nextValue)
      : nextValue;

    setUpdatedTask(changedTask);
  }


  function handleSave (e) {
    e.stopPropagation();
    if (isTaskValid(updatedTask)) {
      saveTask(updatedTask, project);
      setTask(updatedTask);
      onCloseForm(e)
    }
  }


  function handleDiscard (e) {
    e.stopPropagation();
    onCloseForm(e);
  }


  return (
    <tr>
      <td>
          <form 
            id={formId}
            onSubmit={e => e.preventDefault()}
          />
          <input
            form={formId} 
            type="hidden" 
            name="id" 
            value={updatedTask.id}
          />
          {updatedTask.id}
        </td>
        <td><Title       {...inputProps} /></td>
        <td><Description {...inputProps} /></td>
        <td><Notes       {...inputProps} /></td>
        <td><DueDate     {...inputProps} /></td>
        <td><Priority    {...inputProps} /></td>
        <td><Status      {...inputProps} /></td>
        <td className="actions-column">

            <button 
              onClick={(e) => handleSave(e)}
              role='button'
              className='btn btn-outline-info item-action-btn'
            >
              Save
            </button>
            
            <button 
              onClick={(e) => handleDiscard(e)}
              role='button'
              className='btn btn-outline-warning item-action-btn'
            >
              Discard
            </button>

        </td>
    </tr>
  )
}

export default EditTask;