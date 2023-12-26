import React, { useReducer, useState } from "react";

import Tasks from "../Tasks/Tasks";

import { ProjectProvider } from "../Contexts/ProjectContext";


function SingleProject ({project}) {

  return (
    <ProjectProvider initialProject={project}>
      <Tasks />
    </ProjectProvider>
  )
}



export default SingleProject;


