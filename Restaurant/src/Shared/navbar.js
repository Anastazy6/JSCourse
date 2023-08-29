const navitems = [
  'Home',
  'Menu',
  'Contact'
]

function Navbar() {
  const navbar   = document.createElement('nav');
  const fragment = document.createDocumentFragment();

  navbar.classList.add("navbar");
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