import React from "react";

import Navbar from "./Navbar";

import AllProjects   from "../Projects/AllProjects";
import SingleProject from "../Projects/SingleProject";
import SingleTask    from "../Tasks/SingleTask";

import { useView }         from "../Contexts/ViewContext";
import { useViewDispatch } from "../Contexts/ViewContext";


function Contents () {
  const view         = useView();
  const dispatchView = useViewDispatch();

  function renderView (view) {
    switch (view.type) {
      case 'singleProject': {
        return <SingleProject projectId={view.itemId} />;
      }
      case 'allProjects': {
        return <AllProjects />
      }
      case 'singleTask': {
        return (
          <SingleTask 
            taskId={view.itemId.task} 
            hostProjectId={view.itemId.host}
          />
        );
      }
      case 'about': {
        return <h1>ABOUT: section is not yet implemented</h1>
      }
      default: {
        console.warn(`View "${view.type}" is invalid. Rendering all projects instead.`);
        return <AllProjects />
      }
    }
  }


  function handleSwitchView (type, itemId=null) {
    dispatchView({
      type: "switched_view",
      nextView: {
        type              : type,
        itemId            : itemId,
        newItemFormVisible: false
      }
    });
  }

  return (
    <>
      <Navbar 
        onSwitchView={handleSwitchView}
      />
      <main>
        {renderView(view)}
      </main>
    </>
  );
}


export default Contents