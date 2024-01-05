import React from "react";

import Tasks from "../Tasks/Tasks";

import { ProjectProvider } from "../Contexts/ProjectContext";
import { getProject } from "../Storage/projects";
import Header from "../Shared/Header";

function SingleProject ({projectId}) {
  const project = getProject(projectId);

  const notesSection = project.notes === ''
    ? null
    : 
      <>
        <Header level='h2' text='Notes' />
        <article
          className='centered mobile-width'
        >
          {project.notes}
        </article>
      </>


  return (
    <ProjectProvider initialProject={project}>
    
      <Header level='h1' text={project.title} />
      <article
        className='centered mobile-width'
      >
        {project.description}
      </article>
      {notesSection}

      <Tasks />
    </ProjectProvider>
  )
}



export default SingleProject;


