import React from "react";
import formItems from "./form_elements";

import { createElement } from "react";

function FormItem ({item}) {
  console.log(typeof item.tag);
  
  const Element = createElement(
    item.tag,
    {
      name: item.name,
      id  : `project-form-${item.name}`
    }
  );
    
    console.log(Element);
  if (item.required) Element.setAttribute('required', '');
  
  Object.entries(item).forEach(([attr, val]) => {
    Element.setAttribute(attr, val);
  });  

  return (
    <div 
      className="project-form-control"
    >
      <label for={`project-form-${item.name}`}>
        {item.name}
      </label>
      <Element
      
      >
      </Element>
    </div>
  );
}


function ProjectForm () {
  const items = formItems.map(item => FormItem({item}));

  return <form>{items}</form>;
}


export default ProjectForm;