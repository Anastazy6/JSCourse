import React, {
  useState,
  useContext
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


function NewTask ({onCreateTask, isVisible}) {
  const project = useProject();

  const [task, setTask] = useState({
    title      : '',
    priority   : MIN_TASK_PRIORITY,
    description: '',
    notes      : '',
    DueDate    : new Date().toLocaleDateString(),
    status     : 'Active'
  });


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
      Storage.saveTask(
        {
          ...task,
          id: Storage.getNextTaskId()
        },
        project
      );
    }
    onCreateTask();
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
        className="new-task-form"
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