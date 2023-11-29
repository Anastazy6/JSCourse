import React from "react";
import ProjectForm from "../Projects/project_form";
import Header from "./Header";
import Projects from "../Projects/Projects";


function Contents ({children}) {
  return (
    <>
      <Header level={'h1'} text={'Projects'} />
      <Header level={'h2'} text={'Create a new Project'}/>
      <ProjectForm />
      <Header level={'h2'} text={'Current Projects'} />
      <Projects />
    </>
  );
}


export default Contents