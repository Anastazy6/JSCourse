function Menu() {
  const menu     = document.createElement('div');
  const fragment = document.createDocumentFragment();

  const test = document.createElement('h1');
  test.innerText = "Menu page loaded!";

  fragment.appendChild(test);
  menu    .appendChild(fragment);

  return menu;
}

export default Menu;