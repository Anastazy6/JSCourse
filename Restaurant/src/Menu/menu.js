import Contents from "./contents";

function Menu() {
  const menu     = document.createElement('div');
  const fragment = document.createDocumentFragment();

  fragment.appendChild(MenuHeader());

  Object.entries(Contents).map(([group, drinks]) => {
    fragment.appendChild(createMenuGroup(group, drinks));
  })

  menu.appendChild(fragment);

  return menu;
}

function MenuHeader() {
  const header = document.createElement('h1');
  header.innerText = 'Menu';

  return header;
}


function createMenuGroup(group, drinks) {
  const menuGroup = document.createElement('section');
  const fragment  = document.createDocumentFragment();
  const header    = document.createElement('h2');

  header.innerText = group;
  fragment.appendChild(header);

  drinks.map(drink => fragment.appendChild(createDrink(drink)));

  menuGroup.appendChild(fragment);
  return menuGroup;
}


function createDrink(drinkData) {
  const drink    = document.createElement('article');
  const fragment = document.createDocumentFragment();

  Object.entries(drinkData).map(([key, value]) => {
    const field = document.createElement(key === 'name' ? 'h3' : 'div');
    
    field.classList.add(`drink-${key}`);
    field.innerText = value;

    fragment.appendChild(field);
  })

  drink.classList.add('menu-drink');
  drink.appendChild(fragment);

  return drink;
}


export default Menu;