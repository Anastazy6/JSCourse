import React from "react";
import { HTMLHeaders } from "../Constants/headers";

function Header({level='h1', text}) {
  if ( !(HTMLHeaders.includes(level))) {
    console.error(`${level} is not a valid header level!`);
    return false;
  }

  const Level = level;

  return <Level>{text}</Level>;
}

export default Header ;