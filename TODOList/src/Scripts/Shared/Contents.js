import React, { useState } from "react";



import Header        from "./Header";
import AllProjects      from "../Projects/AllProjects";
import SingleProject from "../Projects/SingleProject";

import * as ProjectsStorage from '../Storage/projects';


function Contents () {
  const defaultProject = ProjectsStorage.getDefaultProject();
  const defaultView    = !!defaultProject 
    ? <SingleProject project={defaultProject} />
    : <AllProjects />;


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