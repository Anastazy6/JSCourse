import React, {
  useContext
} from "react";

import { useProject } from "../../Contexts/ProjectContext";

import Header      from "../../Shared/Header";
import TasksHeader from "./TasksHeader";


function TasksView ({tasks, renderedTasks, isVisible}) {
  const project = useProject().project;

  return (
    <section
    style={{display: isVisible ? '' : 'none'}}
  >
  <Header level={'h2'} text={`${project.title} - tasks`} />
  {tasks
  ? (
    <table 
      className="moonlit-table"
      id="all-tasks"  
    >
      <TasksHeader />
      <tbody>
        {renderedTasks}
      </tbody>
    </table>
  ) : (
    <Header
      level={'h3'}
      text={'You have no Tasks for this Project yet'}
    />
  )}
  </section>
  )
}

export default TasksView;