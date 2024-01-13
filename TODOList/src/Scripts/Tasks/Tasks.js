import React, { 
  useState,
} from "react";

import { 
  useProject, 
  useProjectDispatch
} from "../Contexts/ProjectContext";

import { 
  useView,
  useViewDispatch
} from "../Contexts/ViewContext";

import * as Storage         from '../Storage/tasks';
import NewTask              from "./Components/NewTask";
import TasksView            from "./Components/TasksView";
import ViewSwitch           from "../Shared/ViewSwitch";
import { getProject }       from "../Storage/projects";
import { useEditsDispatch } from "../Contexts/EditsContext";
import { EditsProvider }    from "../Contexts/EditsContext";

function Tasks () { 
  const project  = useProject();
  const dispatch = useProjectDispatch();

  const View         = useView();
  const dispatchView = useViewDispatch();
  
  const [tasks, setTasks] = useState(Storage.getTasks(project));


  function addTaskToProject (newTaskId) { 
    dispatch({ 
      type     : 'added_task',
      newTaskId: newTaskId
    });
  }


  function refresh () { 
    setTasks(Storage.getTasks(getProject(project.id)));
    dispatchView({ 
      type: 'closed_form'
    });
  }

  function handleClickTask (taskId) { 
    dispatchView({ 
      type    : 'switched_view',
      nextView: { 
        type  : 'singleTask',
        itemId: { 
          task: taskId,
          host: project.id
        }
      }
    });
  }

  function toggleForm () { 
    dispatchView({ 
      type: 'toggled_form'
    });
  }


  return (
    <>      
      <NewTask 
        onCreateTask  = { refresh }
        updateProject = { addTaskToProject }
        isVisible     = { View.newItemFormVisible }
      />

      <EditsProvider>
        <TasksView 
          tasks        = { tasks }
          onUpdate     = { refresh }
          isVisible    = { !View.newItemFormVisible }
          onVisitTask  = { handleClickTask }
        />
      </EditsProvider>

      <ViewSwitch
        onSwitchView  = { toggleForm }
        isFormVisible = { View.newItemFormVisible }
        viewName      = 'Task'
      />

    </>
  );
}


export default Tasks;