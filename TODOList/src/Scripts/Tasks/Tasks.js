import React, {
  useState,
} from "react";

import { useProject, useProjectDispatch } from "../Contexts/ProjectContext";

import * as Storage from '../Storage/tasks';

import NewTask    from "./Components/NewTask";
import TasksRow   from "./Components/TasksRow";
import TasksView  from "./Components/TasksView";
import ViewSwitch from "../Shared/ViewSwitch";


function Tasks () {
  const project  = useProject();
  const dispatch = useProjectDispatch();
  
  console.log(typeof dispatch);

  

  const [tasks, setTasks] = useState(Storage.getTasks(project));
  const [isNewTaskFormVisible, setIsNewTaskFormVisible] = useState(false);

  let renderedTasks;

  
  
  function refresh () {
    dispatch({
      type: 'changed'
    });
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
      />

      <TasksView 
        tasks        ={tasks}
        renderedTasks={renderedTasks}
        isVisible    ={!isNewTaskFormVisible}
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