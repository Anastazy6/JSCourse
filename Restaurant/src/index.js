import "./styles/styles.scss";

import Navbar  from "./Shared/navbar";
import Footer  from "./Shared/footer";

import Home    from "./Home/home";
import Menu    from "./Menu/menu";
import Contact from "./Contact/contact";

import { navitems } from "./Shared/navbar";



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

  const views = [
    Home,
    Menu,
    Contact
  ]

  run();
  


  function run() {
    contentOrder.map(item => content.appendChild(item));

    show(Home);
    turnNavbarOn();
  }


  function show(view) {
    if (!(views.includes(view))) {
      console.error(
        `Error: View "${view.name}" does not exist. Valid options are "` +
        `${views.map(v => v.name).join('", "')}".`
      
        );
      return false;
    }
    
    main.innerHTML = '';
    main.appendChild(view());
    indicateCurrentView(view);
  }


  function turnNavbarOn() {
    navitems.map(item => {
      const view = views.filter(v => v.name === item.view);

      console.log(view[0].name);

      if (view.length > 1) {
        console.error(
          `Error: there are more than one views which match the navItem's view property "${item.view}"!`
        )
        return false;
      }
      
      item.pointer.addEventListener('click', () => show(view[0]));
    })
  }


  function indicateCurrentView(view) {
    const activeBtn = navitems.filter(item => item.view === view.name)[0].pointer;
    
    navitems.map(item => {
      item.pointer.classList.remove('btn-outline-ghostwhite' );
      item.pointer.classList.add   ('btn-outline-lleuad-lawn');
    })

    activeBtn.classList.remove('btn-outline-lleuad-lawn');
    activeBtn.classList.add   ('btn-outline-ghostwhite' );
  }
});


