import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";

import ProjectsView   from "./Components/ProjectsView";
import NewProject     from "./Components/New-Project";
import ProjectsRow    from "./Components/ProjectsRow";
import ViewSwitch     from "../Shared/ViewSwitch";

import * as Storage from "../Storage/projects";
import { useViewDispatch } from "../Contexts/ViewContext";



function AllProjects () {
  const [projects, setProjects] = useState(Storage.getProjects());
  const [isNewProjectFormVisible, setIsNewProjectFormVisible] = useState(false);
  
  let  renderedProjects;

  const dispatchView = useViewDispatch();


  function refresh () {
    setProjects(Storage.getProjects());
    setIsNewProjectFormVisible(false);
  }


  function toggleForm () {
    setIsNewProjectFormVisible(!isNewProjectFormVisible);
  }


  function handleClickProject (id) {
    dispatchView({
      type  : 'switched_view',
      nextView: {
        type  : "singleProject",
        itemId: id
      }
    }); 
  }


  if (projects) {
    renderedProjects = projects.map(p => {
      return (
        <ProjectsRow  
          props={p}
          onUpdate={refresh}
          key={`project#${p.id}`}
          onVisitProject={handleClickProject}
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
        onSwitchView ={toggleForm}
        isFormVisible={isNewProjectFormVisible}
        viewName     ='Project'
      />

    </>
  )
}


export default AllProjects;