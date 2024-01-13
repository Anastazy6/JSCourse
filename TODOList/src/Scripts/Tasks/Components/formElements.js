import React from "react";

import {
  MAX_TASK_TITLE_LENGTH,
  MAX_TASK_DESCRIPTION_LENGTH,
  MIN_TASK_PRIORITY,
  MAX_TASK_PRIORITY
} from '../../Constants/constraints';

import {
  Label,
  Textarea,
  ImportantInput
} from '../../Shared/helpers';


export function Title (props) {
  const properties = {
    onChange : props.onChange,
    value    : props.task.title,
    id       : 'task-title-input',
    name     : 'title',
    type     : 'text',
    maxLength: MAX_TASK_TITLE_LENGTH
  }


  return (
    <>
      {props.label
      ? <div className='new-todolist-item-fieldset'>
          <Label          {...properties} type={'task'} />
          <ImportantInput {...properties} />
        </div>
      : <ImportantInput   {...properties} />
      }
    </>
  );
}


export function Priority (props) {
  const properties = {
    type    : 'number',
    value   : props.task.priority,
    onChange: props.onChange,
    id      :'task-priority-input',
    name    : 'priority',
    min     : MIN_TASK_PRIORITY,
    max     : MAX_TASK_PRIORITY,
    step    : 1
  }

  return(
    <>
      {props.label
        ? <div className='new-todolist-item-fieldset'>
            <Label          {...properties} type={'task'} />
            <ImportantInput {...properties} />
          </div>
        : <ImportantInput   {...properties} />
      }
    </>
  );
}


export function Description (props) {
  const properties = {
    onChange : props.onChange,
    value    : props.task.description,
    id       : 'task-description-input',
    name     : 'description',
    maxLength: MAX_TASK_DESCRIPTION_LENGTH
  }

  return (
    <>
      {props.label
        ? <div className='new-todolist-item-fieldset'>
            <Label    {...properties} />
            <Textarea {...properties} />
          </div>
        : <Textarea   {...properties} />
      }
    </>
  );
}


export function Notes (props) {
  const properties = {
    value   : props.task.notes,
    onChange: props.onChange,
    id      : 'task-notes-input',
    name    : 'notes'
  }

  return (
    <>
      {props.label
        ? <div className='new-todolist-item-fieldset'>
            <Label    {...properties} />
            <Textarea {...properties} />
          </div>
        : <Textarea {...properties} />
      }
    </>
  );
}


export function Status (props) {
  const properties = {
    id      : 'task-status-input',
    name    : 'status',
    onChange: props.onChange,
    value   : props.task.status
  }

  const options = [
    'Active',
    'Overdue',
    'Failed',
    'Finished'
  ]


  return (
    <>
      {props.label && <Label {...properties} type={'task'} />}
      <select
        {...properties}
      >
        {options.map(o => {
          return (
            <option
              key={o}
              value={o}
              className={`task-status-${o}`}
            > 
              {o} 
            </option>
          )
        })}
      </select>
    </>
  )
}


export function DueDate (props) {
  const properties = {
    type    : 'date',
    value   : props.task.dueDate,
    onChange: props.onChange,
    id      : 'task-due-date-input',
    name    : 'dueDate',
    min     : props.task.min
  }



  return (
    <>
      {props.label
        ? <div className='new-todolist-item-fieldset'>
            <Label          {...properties} type={'task'} />
            <ImportantInput {...properties} />
          </div>
        : <ImportantInput   {...properties} />
      }      
    </>
  );
}


export function Submit () {
  return (
    <button
      className='btn btn-outline-lleuad'
      role='submit'
    >
      Create task
    </button>
  );
}

