import React, {
  useContext
} from "react";

import { useProject } from "../../Contexts/ProjectContext";

import Header      from "../../Shared/Header";
import TasksHeader from "./TasksHeader";
import TasksRow    from "./TasksRow";


function TasksView ({tasks, isVisible, onUpdate}) {
  const project = useProject();

  console.log(tasks);

  function renderTasks (tasks) {
    if (tasks) {
      return tasks.map(t => {
        return (
          <TasksRow
            props   ={t}
            onUpdate={onUpdate}
            key     ={`task#${t.id}`}
          />
        );
      });
    }
    return null;
  }


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
        {renderTasks(tasks)}
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