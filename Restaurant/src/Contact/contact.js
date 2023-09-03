import Contents   from "./contents";
import { Header } from "../Shared/Header";

import { createItemsGroup } from "../Shared/Contents";

const customProperties = {
  group: 'contact',
  item : 'item'
}


function Contact() {
  const contact  = document.createElement('div');
  const fragment = document.createDocumentFragment();

  fragment.appendChild(Header('h1', 'Contact'));
  
  Object.entries(Contents).map(([group, items]) => {
    fragment.appendChild(createItemsGroup(group, items, customProperties));
  })
  
  contact .appendChild(fragment);

  return contact;
}

export default Contact;