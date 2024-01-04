import React, { useState } from "react";

import Navbar from "./Navbar";

import AllProjects      from "../Projects/AllProjects";
import SingleProject from "../Projects/SingleProject";

import { useView }         from "../Contexts/ViewContext";
import { useViewDispatch } from "../Contexts/ViewContext";


function Contents () {
  const view         = useView();
  const dispatchView = useViewDispatch();

  console.log("Logging view item ---------------------------------")
  console.log(view);
  console.log("Logging view item ---------------------------------")


  function renderView (view) {
    switch (view.type) {
      case 'singleProject': {
        return <SingleProject projectId={view.itemId} />;
      }
      case 'allProjects': {
        return <AllProjects />
      }
      case 'singleTask': {
        console.warn("Single task view is not yet implemented. Rendering all projects instead.")
        return <AllProjects />
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
        type  : type,
        itemId: itemId
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