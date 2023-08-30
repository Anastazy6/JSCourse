import "./styles/styles.scss";

import Navbar from "./Shared/navbar";
import Footer from "./Shared/footer";
import Home   from "./Home/home";

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const main    = document.createElement ('main');

  const navbar = Navbar();
  const footer = Footer();

  const contentOrder = [
    navbar,
    main,
    footer
  ]

  contentOrder.map(item => content.appendChild(item));

  
  main.classList.add("wrapper-with-horizontal-margin-50");
  main.innerHTML = '';
  main.appendChild(Home());
  
  console.log("If this logs, then webpack works");
});
