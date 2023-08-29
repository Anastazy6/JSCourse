import "./styles/styles.scss";

import Navbar from "./Shared/navbar";
import Home   from "./Home/home";

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const main    = document.createElement ('main');
  
  main.classList.add("wrapper-with-horizontal-margin-50");

  content.appendChild(Navbar());
  content.appendChild(main);
  
  main.innerHTML = '';
  main.appendChild(Home());
  
  console.log("If this logs, then webpack works");
});
