const navitems = [
  'Home',
  'Menu',
  'Contact'
]

function Navbar() {
  const navbar = document.createDocumentFragment('nav.navbar');

  navitems.forEach(item => navbar.appendChild(Navitem(item)));

  return navbar;
}

function Navitem(item) {
  const navitem = document.createDocumentFragment('div');

  navitem.innerText = item;

  return navitem;
}


export default Navbar;