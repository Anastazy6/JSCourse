import "../Styles/styles.scss";

import { createRoot } from 'react-dom/client';
import React  from "react";

import Contents from "./Shared/Contents";
import Header   from "./Shared/Header";
import Navbar   from "./Shared/Navbar";
import Footer   from "./Shared/Footer";

document.addEventListener('DOMContentLoaded', () => {
  const root    = createRoot(document.getElementById('react-root'));

  root.render(
    <div id='content'>
      <Navbar />
      <Contents />
      <Footer />
    </div>
  );



  // const content = document.getElementById('content');
  // const main    = document.createElement ('main'   );

  // const contentOrder = [
  //   navbar,
  //   main,
  //   footer
  // ]

  // const views = [
  //   General/default ?
  //   Projects ?
  //   New project ?
  //   New TODO ?
  // ]

  // main.textContent = "Source code has been bundled properly if this is visible";

  //run();  

  // function run() {
  //   contentOrder.map(item => content.appendChild(item));

    // show(Home);
    // turnNavbarOn();
  //}
})