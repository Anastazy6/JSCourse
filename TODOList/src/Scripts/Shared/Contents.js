import React from "react";
import NewProject from "../Projects/Components/New-Project";
import Header     from "./Header";
import Projects   from "../Projects/Projects";


function Contents ({children}) {
  return (
    <main>
      <Projects />
    </main>
  );
}


export default Contents