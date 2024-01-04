import React from "react";
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
    text      : "Home",
    viewType  : "default"
  }, {
    text      : "Projects",
    viewType  : "allProjects",
    viewitemId: null
  }, {
    text    : "About",
    viewType: "about"
  }
]


function Navbar({onSwitchView}) {
  const items = navitems.map((item, id) => {
    let navitem = <Navitem 
      key={id} 
      text={item.text}
      viewType={item.viewType}
      viewitemId={item.viewitemId}
      onSwitchView={onSwitchView}
    />;
    item.pointer = navitem;
    return navitem;
  });

  return (
    <nav className='navbar'>
      {items}
    </nav>
  );
}

function Navitem({text, onSwitchView, viewType, viewitemId}) {
  return (
    <button 
      className=' btn 
                  btn-outline-ghostwhite
                  navbar-btn'
      onClick={() => onSwitchView(viewType, viewitemId)}
    >
      {text}
    </button>
  );
}


export default Navbar;

export { navitems };