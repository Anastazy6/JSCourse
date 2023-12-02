import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";

import SingleProject  from "./Components/SingleProject";
import ProjectsHeader from "./Components/ProjectsHeader";


import * as Storage from "./storage";



function Projects () {
  const [projects, setProjects] = useState(Storage.getProjects());
  let  renderedProjects;


  function refresh () {
    setProjects(Storage.getProjects());
  }


  if (projects) {
    renderedProjects = projects.map(p => {
      return (
        <SingleProject
          props={p}
          key={`project#${p.id}`}
          refresh={() => refresh()}
        />
      )
    });
  }


  return ( 
    projects
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
    )
  )
}







export default Projects;