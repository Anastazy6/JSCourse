import React, { useState } from "react";

import * as Storage from '../Storage/tasks';

import NewTask    from "./Components/NewTask";
import TasksRow   from "./Components/TasksRow";
import TasksView  from "./Components/TasksView";
import ViewSwitch from "../Shared/ViewSwitch";


function Tasks ({project}) {
  const [tasks, setTasks] = useState(Storage.getTasks(project));
  const [isNewTaskFormVisible, setIsNewTaskFormVisible] = useState(false);

  let renderedTasks;

  
  function refresh () {
    setTasks(Storage.getTasks(project));
    setIsNewTaskFormVisible(false);
  }


  function switchView () {
    setIsNewTaskFormVisible(!isNewTaskFormVisible);
  }
  
  
  if (tasks) {
    renderedTasks = tasks.map(t => {
      return (
        <TasksRow
          props   ={t}
          onUpdate={refresh}
          key     ={`task#${t.id}`}
        />
      );
    });
  }


  return (
    <>      
      <NewTask 
        onCreateTask={refresh} 
        isVisible   ={isNewTaskFormVisible}
        project     ={project}
      />

      <TasksView 
        tasks        ={tasks}
        renderedTasks={renderedTasks}
        isVisible    ={!isNewTaskFormVisible}
        project      ={project}
      />

      <ViewSwitch 
        onSwitchView ={switchView}
        isFormVisible={isNewTaskFormVisible}
        viewName     ='Task'
      />

    </>
  );
}


export default Tasks;