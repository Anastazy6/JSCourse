import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";

import SingleProject  from "./Components/SingleProject";
import ProjectsHeader from "./Components/ProjectsHeader";
import NewProject     from "./Components/New-Project";


import * as Storage from "./storage";



function Projects () {
  const [projects, setProjects] = useState(Storage.getProjects());
  const [isNewProjectFormVisible, setIsNewProjectFormVisible] = useState(false);
  
  let  renderedProjects;


  function refresh () {
    setProjects(Storage.getProjects());
    setIsNewProjectFormVisible(false);
  }


  function switchView () {
    setIsNewProjectFormVisible(!isNewProjectFormVisible);
  }


  if (projects) {
    renderedProjects = projects.map(p => {
      return (
        <SingleProject
          props={p}
          onUpdate={refresh}
          key={`project#${p.id}`}
        />
      )
    });
  }


  return ( 
    <>
      <Header level={'h1'} text={'Projects'} />
      
      <NewProject 
        onCreateProject={refresh} 
        isVisible      ={isNewProjectFormVisible}
      />

      <ProjectsView 
        projects        ={projects}
        renderedProjects={renderedProjects}
        isVisible       ={!isNewProjectFormVisible}
      />

      <ViewSwitch 
        onSwitchView ={switchView}
        isFormVisible={isNewProjectFormVisible}
      />

    </>
  )
}


export default Projects;


function ProjectsView ({projects, renderedProjects, isVisible}) {
  return (
    <section
    style={{display: isVisible ? '' : 'none'}}
  >
  <Header level={'h2'} text={'Current Projects'} />
  {projects
  ? (
    <table id='all-projects'>
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


function ViewSwitch ({onSwitchView, isFormVisible}) {
  return (
    <button
    className='btn btn-outline-lleuad-lawn'
    onClick  ={onSwitchView}
  >

  {isFormVisible ? 'Show projects' : 'Create a new Project'}
  </button>
  )
}