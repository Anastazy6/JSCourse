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


  function renderWithNewTask () {
    refresh();
    switchView();
  }

  function addTaskToProject (newTaskId) {
    dispatch({
      type     : 'added_task',
      newTaskId: newTaskId
    });
  }

  function refresh () {
    // let bandAidedTasks = [...project.tasks, newTaskId];

    // let bandAidedProject = newTaskId 
    // ? {
    //     ...project,
    //     tasks: bandAidedTasks
    //   } 
    // : project; 
    setTasks(Storage.getTasks(getProject(project.id)));
  }


  function switchView () {
    setIsNewTaskFormVisible(!isNewTaskFormVisible);
  }


  return (
    <>      
      <NewTask 
        onCreateTask ={renderWithNewTask}
        updateProject={addTaskToProject}
        isVisible    ={isNewTaskFormVisible}
      />

      <TasksView 
        tasks        ={tasks}
        onUpdate     ={() => setTasks(Storage.getTasks(project))}
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