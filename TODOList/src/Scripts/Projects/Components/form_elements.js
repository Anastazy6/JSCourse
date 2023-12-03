import React  from 'react';

import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../../Constants/constraints";
import { MAX_PROJECT_TITLE_LENGTH       } from "../../Constants/constraints";
import { MIN_PROJECT_PRIORITY           } from "../../Constants/constraints";
import { MAX_PROJECT_PRIORITY           } from "../../Constants/constraints";



export function Title (props) {
  const properties = {
    onChange : props.onChange,
    value    : props.project.title,
    id       : 'project-title-input',
    name     : 'title',
    type     : 'text',
    maxLength:MAX_PROJECT_TITLE_LENGTH
  }


  return (
    <>
      {props.label &&
        <label htmlFor='project-title-input'>
          Title
        </label>
      }
      <input 
        {...properties}
        required
      />
    </>
  )
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
      {props.label &&
        <label htmlFor='project-description-input'>
          description
        </label>
      }
      <textarea
        {...properties}
      >
      </textarea>
    </>
  )
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
      {props.label &&
        <label htmlFor='project-notes-input'>
          Notes
        </label>
      }
      <textarea
        {...properties}
      >
      </textarea>
    </>
  )
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
      {props.label &&
        <label htmlFor='project-priority-input'>
          Priority
        </label>
      }
      <input 
        {...properties}
        required
      />
    </>
  )
}


export function Submit () {
  return (
    <button
      className='btn btn-outline-lleuad'
      role='submit'
    >
      Create project
    </button>
  )
}



