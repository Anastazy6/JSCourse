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


export default Menu;