import React, { useState } from "react";

import { saveTask } from "../../Storage/tasks";

import { isTaskValid } from '../validate';
import { Description, Title } from "./formElements";

function EditTask ({task, setTask, onCloseForm}) {
  const [updatedTask, setUpdatedTask] = useState(task);

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


  function handleSave () {
    if (isTaskValid(updatedTask)) {
      saveTask(updatedTask);
      setTask(updatedTask);
      onCloseForm()
    }
  }


  function handleDiscard () {
    
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
        <td><BestBefore  {...inputProps} /></td>
        <td><Status      {...inputProps} /></td>
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
    </tr>
  )
}

export default EditTask;