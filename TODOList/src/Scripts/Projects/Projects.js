import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";

import ProjectsView   from "./Components/ProjectsView";
import NewProject     from "./Components/New-Project";
import SingleProject  from "./Components/SingleProject";
import ViewSwitch     from "../Shared/ViewSwitch";

import * as Storage from "../Storage/projects";



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
      );
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
        viewName     ='Project'
      />

    </>
  )
}


export default Projects;