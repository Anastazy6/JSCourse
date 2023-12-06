import React, { useState } from "react";



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