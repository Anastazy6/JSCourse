import Contents   from "./contents";

import { Header } from "../Shared/Header";
import { createItemsGroup } from "../Shared/Contents";


const customProperties = {
  group: 'menu',
  item : 'drink'
}


function Menu() {
  const menu     = document.createElement('div');
  const fragment = document.createDocumentFragment();

  fragment.appendChild(Header('h1', "Menu"));

  Object.entries(Contents).map(([group, items]) => {
    fragment.appendChild(createItemsGroup(group, items, customProperties));
  })

  menu.appendChild(fragment);

  return menu;
}




// function createMenuGroup(group, drinks) {
//   const menuGroup = document.createElement('section');
//   const fragment  = document.createDocumentFragment();
  
//   fragment.appendChild(Header('h2', group));

//   drinks.map(drink => fragment.appendChild(createDrink(drink)));

//   menuGroup.appendChild(fragment);
//   return menuGroup;
// }


// function createDrink(drinkData) {
//   const drink    = document.createElement('article');
//   const fragment = document.createDocumentFragment();

//   Object.entries(drinkData).map(([key, value]) => {
//     const field = document.createElement(key === 'name' ? 'h3' : 'div');
    
//     field.classList.add(`drink-${key}`);
//     field.innerText = value;

//     fragment.appendChild(field);
//   })

//   drink.classList.add('menu-drink');
//   drink.appendChild(fragment);

//   return drink;
// }


export default Menu;