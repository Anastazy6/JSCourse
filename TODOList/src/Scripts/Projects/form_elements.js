import React  from 'react';

import { MAX_PROJECT_DESCRIPTION_LENGTH } from "../Constants/constraints";
import { MAX_PROJECT_TITLE_LENGTH       } from "../Constants/constraints";
import { MIN_PROJECT_PRIORITY           } from "../Constants/constraints";
import { MAX_PROJECT_PRIORITY           } from "../Constants/constraints";



export function Title ({project, onChange}) {
  return (
    <>
      <label htmlFor='project-title-input'>
        Title
      </label>
      <input 
        onChange={onChange}
        value={project.title}
        id='project-title-input'
        name='title'
        type='text'
        maxLength={MAX_PROJECT_TITLE_LENGTH}
        required
      />
    </>
  )
}

export function Description ({project, onChange}) {
  return (
    <>
      <label htmlFor='project-description-input'>
        description
      </label>
      <textarea
        onChange={onChange}
        value={project.description}
        id='project-description-input'
        name='description'
        maxLength={MAX_PROJECT_DESCRIPTION_LENGTH}
      >
      </textarea>
    </>
  )
}

export function Notes ({project, onChange}) {
  return (
    <>
      <label htmlFor='project-notes-input'>
        Notes
      </label>
      <textarea
        value={project.notes}
        onChange={onChange}
        id='project-description-notes'
        name='notes'
      >
      </textarea>
    </>
  )
}

export function Priority ({project, onChange}) {
  return(
    <>
      <label htmlFor='project-priority-input'>
        Priority
      </label>
      <input 
        value={project.priority}
        onChange={onChange}
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



