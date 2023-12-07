import React, { useState } from "react";



import Header     from "./Header";
import Projects   from "../Projects/Projects";
import Tasks      from "../Tasks/Tasks";


function Contents ({children}) {
  return (
    <main>
      <Tasks />
    </main>
  );
}


export default Contents