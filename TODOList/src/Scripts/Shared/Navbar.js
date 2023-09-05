/**
 * text: refers to the innerText property of each nav item
 * view: referst to the name of the function that will render the view that
 *       the nav item is supposed to navigate to;
 * pointer: refers to the nav item in DOM, pointer property is added during
 *       creation of the nav item
 * text and view props are likely to be the same, but keeping them separate
 * makes it easier to only change the innerText of the nav items
 */
const navitems = [
  {
    text: "Home",
    view: "Home"
  }, {
    text: "Menu",
    view: "Menu"
  }, {
    text: "Contact",
    view: "Contact"
  }
]


function Navbar() {
  const navbar   = document.createElement('nav');
  const fragment = document.createDocumentFragment();

  navbar.classList.add("navbar");
  navitems.forEach(item => {
    
    // Create navitem;
    const navitem = Navitem(item.text); 
    
    // Store the reference to the navitem so that querying them isn't needed;
    item.pointer  = navitem;

    // Add the navitem to the nav bar;
    fragment.appendChild(navitem);
  });
  navbar.appendChild(fragment);

  return navbar;
}


function Navitem(item) {
  const navitem = document.createElement('button');

  navitem.classList.add('btn', 'btn-outline-ghostwhite', 'navbar-btn');

  navitem.innerText = item;

  return navitem;
}


export default Navbar;

export { navitems };