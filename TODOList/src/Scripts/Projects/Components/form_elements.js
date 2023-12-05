import React  from 'react';

import { 
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MAX_PROJECT_TITLE_LENGTH,
  MIN_PROJECT_PRIORITY,
  MAX_PROJECT_PRIORITY           
} from "../../Constants/constraints";

import { capitalize } from '../../Shared/helpers';


export function Title (props) {
  const properties = {
    onChange : props.onChange,
    value    : props.project.title,
    id       : 'project-title-input',
    name     : 'title',
    type     : 'text',
    maxLength: MAX_PROJECT_TITLE_LENGTH
  }





  return (
    <>
      {props.label
      ? <div className='new-project-form-fieldset'>
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
    value   : props.project.priority,
    onChange: props.onChange,
    id      :'project-priority-input',
    name    : 'priority',
    min     : MIN_PROJECT_PRIORITY,
    max     : MAX_PROJECT_PRIORITY,
    step    : 1
  }

  return(
    <>
      {props.label
        ? <div className='new-project-form-fieldset'>
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
    value    : props.project.description,
    id       : 'project-description-input',
    name     : 'description',
    maxLength: MAX_PROJECT_DESCRIPTION_LENGTH
  }

  return (
    <>
      {props.label
        ? <div className='new-project-form-fieldset'>
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
    value   : props.project.notes,
    onChange: props.onChange,
    id      : 'project-description-notes',
    name    : 'notes'
  }

  return (
    <>
      {props.label
        ? <div className='new-project-form-fieldset'>
            <Label    {...properties} />
            <Textarea {...properties} />
          </div>
        : <Textarea {...properties} />
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
      Create project
    </button>
  );
}


function ImportantInput (props) {
  return <input {...props} required />;
}


function Label (props) {
  return (
    <label htmlFor={`project-${props.name}-input`}>
      {capitalize(props.name)}
    </label>
  )
}


function Textarea (props) {
  return <textarea {...props} />;
}
