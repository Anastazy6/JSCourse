import React from "react";
import NewProject from "../Projects/New-Project";
import Header     from "./Header";
import Projects   from "../Projects/Projects";


function Contents ({children}) {
  return (
    <main>
      <Header level={'h1'} text={'Projects'} />
      <Header level={'h2'} text={'Create a new Project'}/>
      <NewProject />
      <Header level={'h2'} text={'Current Projects'} />
      <Projects />
    </main>
  );
}


export default Contents