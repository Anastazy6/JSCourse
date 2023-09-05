import "../Styles/styles.scss";

import Header from "./Shared/Header";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const main    = document.createElement ('main'   );

  const navbar = Navbar();
  const footer = Footer();

  const contentOrder = [
    navbar,
    main,
    footer
  ]

  // const views = [
  //   General/default ?
  //   Projects ?
  //   New project ?
  //   New TODO ?
  // ]

  main.textContent("Source code has been bundled properly if this is visible");

  run();  

  function run() {
    contentOrder.map(item => content.appendChild(item));

    // show(Home);
    // turnNavbarOn();
  }
})