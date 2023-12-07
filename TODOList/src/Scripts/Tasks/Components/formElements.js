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
          <Label          {...properties} />
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
            <Label          {...properties} />
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
    id      : 'task-description-notes',
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
    type    : 'select',
    value   : props.status
  }
}


export function DueDate (props) {
  const properties = {
    type    : 'date',
    value   : props.dueDate,
    onChange: props.onChange,
    id      :'task-due-date-input',
    name    : 'due date',
  }

  return (
    <>
      {props.label
        ? <div className='new-task-form-fieldset'>
            <Label          {...properties} />
            <ImportantInput {...properties} />
          </div>
        : <ImportantInput   {...properties} />
      }      
    </>
  );
}


export function BestBefore (props) {
  const properties = {
    type    : 'date',
    value   : props.dueDate,
    onChange: props.onChange,
    id      :'task-best-before-input',
    name    : 'best before',
  }

  return (
    <>
      {props.label
        ? <div className='new-task-form-fieldset'>
            <Label {...properties} />
            <Input {...properties} />
          </div>
        : <Input   {...properties} />
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
