import React from "react";

function ViewSwitch ({onSwitchView, isFormVisible, viewName}) {
  return (
    <button
      className='btn btn-outline-lleuad-lawn centered'
      onClick  ={onSwitchView}
  >

  {isFormVisible ? `Show ${viewName}s` : `Create a new ${viewName}`}
  </button>
  )
}

export default ViewSwitch;