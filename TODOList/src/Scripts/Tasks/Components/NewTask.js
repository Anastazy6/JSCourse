import React, {
  useState,
} from "react";

import { useProject } from "../../Contexts/ProjectContext";

import {
  Title,
  Priority,
  Description,
  Notes,
  DueDate,
  Submit
} from './formElements';


import { MIN_TASK_PRIORITY } from "../../Constants/constraints";
import Header from "../../Shared/Header";

import { isTaskValid } from "../validate";

import * as Storage from '../../Storage/tasks';

import { getCurrentDate } from "../../Shared/helpers";



const startingState = {
  title      : '',
  priority   : MIN_TASK_PRIORITY,
  description: '',
  notes      : '',
  dueDate    : getCurrentDate(),
  status     : 'Active',
  min        : getCurrentDate()
}


function NewTask ({onCreateTask, updateProject, isVisible}) {
  const project = useProject();

  const [task, setTask] = useState(startingState);


  const inputProps = {
    task    : task,
    onChange: handleChange,
    label   : true
  }


  function handleChange (e) {
    const property = e.target.name;

    let nextTask = {...task};
    nextTask[property] = e.target.value;

    setTask(nextTask);
  }


  function handleSubmit (e) {
    e.preventDefault();

    if (isTaskValid(task)) {
      const newTaskId = Storage.getNextTaskId();
      Storage.saveTask(
        {
          ...task,
          id: newTaskId
        },
        project
      );
      updateProject(newTaskId);
      setTask(startingState) // reset state to conveniently add new task withour reloading
      onCreateTask(newTaskId)
    }
  }


  return (
    <section 
      style={{display: isVisible ? '' : 'none'}}
    >
      <Header
        level='h2'
        text ='Create a new Task'
      />

      <form
        onSubmit={handleSubmit}
        className="new-todolist-item-form"
      >
        <Title       {...inputProps} />
        <Priority    {...inputProps} />
        <Description {...inputProps} />
        <Notes       {...inputProps} />
        <DueDate     {...inputProps} />
        <Submit />
      </form>

    </section>
  )
}

export default NewTask;