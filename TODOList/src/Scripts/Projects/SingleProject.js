import React, { useReducer, useState } from "react";

import Tasks from "../Tasks/Tasks";

import { ProjectProvider } from "../Contexts/ProjectContext";


function SingleProject (initialProject) {


  return (
    <ProjectProvider initialProject={initialProject}>
      <Tasks />
    </ProjectProvider>
  )
}



export default SingleProject;


