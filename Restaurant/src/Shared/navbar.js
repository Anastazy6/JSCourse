const navitems = [
  'Home',
  'Menu',
  'Contact'
]

function Navbar() {
  const navbar   = document.createElement('nav.navbar');
  const fragment = document.createDocumentFragment();

  navitems.forEach(item => fragment.appendChild(Navitem(item)));
  navbar.appendChild(fragment);

  return navbar;
}

function Navitem(item) {
  const navitem = document.createElement('div');

  navitem.innerText = item;

  return navitem;
}


export default Navbar;