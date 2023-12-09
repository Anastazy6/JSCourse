import React from "react";

import ProjectsHeader from "./ProjectsHeader";

import Header from "../../Shared/Header";

function ProjectsView ({projects, renderedProjects, isVisible}) {
  return (
    <section
    style={{display: isVisible ? '' : 'none'}}
  >
  <Header level={'h2'} text={'Current Projects'} />
  {projects
  ? (
    <table
      className="moonlit-table"
      id="all-projects"  
    >
      <ProjectsHeader />
      <tbody>
        {renderedProjects}
      </tbody>
    </table>
  ) : (
    <Header 
      level={'h3'}
      text={'You have no Projects yet'}
    />
  )}
  </section>
  )
}

export default ProjectsView;