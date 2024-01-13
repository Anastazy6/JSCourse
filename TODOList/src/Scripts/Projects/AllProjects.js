import React from "react";
import { useState } from "react";

import Header from "../Shared/Header";

import ProjectsView   from "./Components/ProjectsView";
import NewProject     from "./Components/New-Project";
import ProjectsRow    from "./Components/ProjectsRow";
import ViewSwitch     from "../Shared/ViewSwitch";

import * as Storage from "../Storage/projects";
import { useView, useViewDispatch } from "../Contexts/ViewContext";

import { EditsProvider } from "../Contexts/EditsContext";

function AllProjects () {
  const [projects, setProjects] = useState(Storage.getProjects());
  
  let  renderedProjects;

  const View         = useView();
  const dispatchView = useViewDispatch();



  function refresh () {
    setProjects(Storage.getProjects());
    dispatchView({
      type: 'closed_form'
    });
  }


  function toggleForm () {
    dispatchView({
      type: 'toggled_form'
    });
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
        isVisible      ={View.newItemFormVisible}
      />

      <EditsProvider>
        <ProjectsView 
          projects        ={projects}
          renderedProjects={renderedProjects}
          isVisible       ={!View.newItemFormVisible}
        />
      </EditsProvider>

      <ViewSwitch 
        onSwitchView ={toggleForm}
        isFormVisible={View.newItemFormVisible}
        viewName     ='Project'
      />

    </>
  )
}


export default AllProjects;