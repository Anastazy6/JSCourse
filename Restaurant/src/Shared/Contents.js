import { Header } from "./Header";

function createItemsGroup(group, items, customProperties={}) {
  const itemsGroup = document.createElement('section');
  const fragment   = document.createDocumentFragment();

  fragment.appendChild(Header('h2', group));

  items.map(item => fragment.appendChild(createItem(item, customProperties)));

  itemsGroup.appendChild(fragment);
  return itemsGroup;
}


function createItem(itemData, customProperties) {
  const item     = document.createElement('article');
  const fragment = document.createDocumentFragment();

  const groupType = customProperties['group'] || 'group';
  const itemType  = customProperties['item' ] || 'item';

  Object.entries(itemData).map(([key, value]) => {
    const field = document.createElement(key === 'name' ? 'h3' : 'div');
    
    field.classList.add(`${itemType}-${key}`);
    field.innerText = value;

    fragment.appendChild(field);
  })

  item.classList.add(`${groupType}-${itemType}`);
  item.appendChild(fragment);

  return item;
}

export { createItemsGroup };