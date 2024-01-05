import React, {
  useState,
} from "react";

import { useProject, useProjectDispatch } from "../Contexts/ProjectContext";

import * as Storage from '../Storage/tasks';

import NewTask    from "./Components/NewTask";
import TasksView  from "./Components/TasksView";
import ViewSwitch from "../Shared/ViewSwitch";
import { getProject } from "../Storage/projects";


function Tasks () {
  const project  = useProject();
  const dispatch = useProjectDispatch();
  
  const [tasks, setTasks] = useState(Storage.getTasks(project));
  const [isNewTaskFormVisible, setIsNewTaskFormVisible] = useState(false);


  function addTaskToProject (newTaskId) {
    dispatch({
      type     : 'added_task',
      newTaskId: newTaskId
    });
  }


  function refresh () {
    setTasks(Storage.getTasks(getProject(project.id)));
    setIsNewTaskFormVisible(false);
  }


  function toggleForm () {
    setIsNewTaskFormVisible(!isNewTaskFormVisible);
  }


  return (
    <>      
      <NewTask 
        onCreateTask ={refresh}
        updateProject={addTaskToProject}
        isVisible    ={isNewTaskFormVisible}
      />

      <TasksView 
        tasks        ={tasks}
        onUpdate     ={refresh}
        isVisible    ={!isNewTaskFormVisible}
      />

      <ViewSwitch
        onSwitchView ={toggleForm}
        isFormVisible={isNewTaskFormVisible}
        viewName     ='Task'
      />

    </>
  );
}


export default Tasks;