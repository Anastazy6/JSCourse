import React from "react";

import Tasks from "../Tasks/Tasks";

import { ProjectProvider } from "../Contexts/ProjectContext";
import { getProject } from "../Storage/projects";


function SingleProject ({projectId}) {
  const project = getProject(projectId);

  return (
    <ProjectProvider initialProject={project}>
      <Tasks />
    </ProjectProvider>
  )
}



export default SingleProject;


