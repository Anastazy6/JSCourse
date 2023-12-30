import React, {
  createContext,
  useContext,
  useReducer
} from "react";



const ProjectContext         = createContext(null);
const ProjectDispatchContext = createContext(null);


export function ProjectProvider ({ initialProject, children }) {
  const [project, dispatch] = useReducer(projectReducer, initialProject);

  return (
    <ProjectContext.Provider value={ project } >
      <ProjectDispatchContext.Provider value={ dispatch }>
        { children }
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}


export function useProject () {
  return useContext(ProjectContext);
}


export function useProjectDispatch () {
  return useContext(ProjectDispatchContext);
}


function projectReducer (project, action) {
  switch (action.type) {
    case 'added_task': {
      const updatedProject = {
        ...project,
        tasks: [...project.tasks, action.newTaskId]
      }
      return updatedProject;
    }
    case 'changed_task': {
      return {...project}
    }
    default:
      throw Error('Invalid action type');
  }
}
