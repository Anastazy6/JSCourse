import React  from 'react';

import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../Constants/constraints";
import { MAX_PROJECT_TITLE_LENGTH       } from "../Constants/constraints";
import { MIN_PROJECT_PRIORITY           } from "../Constants/constraints";
import { MAX_PROJECT_PRIORITY           } from "../Constants/constraints";



export function Title (props) {
  return (
    <>
      {props.label &&
        <label htmlFor='project-title-input'>
          Title
        </label>
      }
      <input 
        onChange={props.onChange}
        value={props.project.title}
        id='project-title-input'
        name='title'
        type='text'
        maxLength={MAX_PROJECT_TITLE_LENGTH}
        required
      />
    </>
  )
}

export function Description (props) {
  return (
    <>
      {props.label &&
        <label htmlFor='project-description-input'>
          description
        </label>
      }
      <textarea
        onChange={props.onChange}
        value={props.project.description}
        id='project-description-input'
        name='description'
        maxLength={MAX_PROJECT_DESCRIPTION_LENGTH}
      >
      </textarea>
    </>
  )
}

export function Notes (props) {
  return (
    <>
      {props.label &&
        <label htmlFor='project-notes-input'>
          Notes
        </label>
      }
      <textarea
        value={props.project.notes}
        onChange={props.onChange}
        id='project-description-notes'
        name='notes'
      >
      </textarea>
    </>
  )
}

export function Priority (props) {
  return(
    <>
      {props.label &&
        <label htmlFor='project-priority-input'>
          Priority
        </label>
      }
      <input 
        value={props.project.priority}
        onChange={props.onChange}
        id='project-priority-input'
        name='priority'
        min={MIN_PROJECT_PRIORITY}
        max={MAX_PROJECT_PRIORITY}
        step='1'
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



