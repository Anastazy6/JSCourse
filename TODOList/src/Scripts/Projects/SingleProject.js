import React, { useState } from "react";

import Tasks from "../Tasks/Tasks";

function SingleProject ({project}) {


  return (
    <>
      <Tasks project={project} />
    </>
  )
}



export default SingleProject;