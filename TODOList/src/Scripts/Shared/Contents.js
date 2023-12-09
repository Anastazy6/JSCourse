import React, { useState } from "react";



import Header     from "./Header";
import Projects   from "../Projects/Projects";
import Tasks      from "../Tasks/Tasks";

import * as ProjectsStorage from '../Storage/projects';


function Contents () {
  const defaultProject = ProjectsStorage.getDefaultProject();
  const defaultView    = !!defaultProject 
    ? <Tasks project={defaultProject} />
    : <Projects />;


  const [view, setView] = useState(defaultView);


  function handleSwitchView (e) {
    
  }

  return (
    <main>
      {view}
    </main>
  );
}


export default Contents