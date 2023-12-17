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
  Input,
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
      ? <div className='new-task-form-fieldset'>
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
        ? <div className='new-task-form-fieldset'>
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
        ? <div className='new-task-form-fieldset'>
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
        ? <div className='new-task-form-fieldset'>
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
    value   : props.status
  }

  return (
    <>
      {props.label && <Label {...properties} type={'task'} />}
      <select
        id='task-status-input'
        defaultValue='Active'
      >
        <option value='Active'>Active</option>
        <option value='Overdue'>Overdue</option>
        <option value='Failed'>Failed</option>
        <option value='Finished'>Finished</option>

      </select>
    </>
  )
}


export function DueDate (props) {
  const properties = {
    type    : 'date',
    value   : props.dueDate,
    onChange: props.onChange,
    id      : 'task-due-date-input',
    name    : 'dueDate',
  }

  return (
    <>
      {props.label
        ? <div className='new-task-form-fieldset'>
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