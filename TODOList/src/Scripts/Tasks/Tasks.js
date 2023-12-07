import React, { useState } from "react";

import * as Storage from './storage';
import SingleTask from "./Components/SingleTask";

import Header  from "../Shared/Header";
import NewTask from "./Components/NewTask";
import TasksHeader from "./Components/TasksHeader";


function Tasks () {
  const [tasks, setTasks] = useState(Storage.getTasks());
  const [isNewTaskFormVisible, setIsNewTaskFormVisible] = useState(false);

  let renderedTasks;

  
  function refresh () {
    setTasks(Storage.getTasks());
    setIsNewTaskFormVisible(false);
  }


  function switchView () {
    setIsNewTaskFormVisible(!isNewTaskFormVisible);
  }
  
  
  if (tasks) {
    renderedTasks = tasks.map(t => {
      return (
        <SingleTask
          props   ={t}
          onUpdate={refresh}
          key     ={`task#${t.id}`}
        />
      );
    });
  }


  return (
    <>
      <Header level={'h1'} text={'Tasks'} />
      
      <NewTask 
        onCreateTask={refresh} 
        isVisible   ={isNewTaskFormVisible}
      />

      <TasksView 
        tasks        ={tasks}
        renderedTasks={renderedTasks}
        isVisible    ={!isNewTaskFormVisible}
      />

      <ViewSwitch 
        onSwitchView ={switchView}
        isFormVisible={isNewTaskFormVisible}
      />

    </>
  );
}





export default Tasks;


function TasksView ({tasks, renderedTasks, isVisible}) {
  return (
    <section
    style={{display: isVisible ? '' : 'none'}}
  >
  <Header level={'h2'} text={'Current Tasks'} />
  {tasks
  ? (
    <table id='all-tasks'>
      <TasksHeader />
      <tbody>
        {renderedTasks}
      </tbody>
    </table>
  ) : (
    <Header 
      level={'h3'}
      text={'You have no Tasks yet'}
    />
  )}
  </section>
  )
}


function ViewSwitch ({onSwitchView, isFormVisible}) {
  return (
    <button
    className='btn btn-outline-lleuad-lawn'
    onClick  ={onSwitchView}
  >

  {isFormVisible ? 'Show Tasks' : 'Create a new Task'}
  </button>
  )
}