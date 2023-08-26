import _ from 'lodash';
import myName from './myName';
import './style.css';
import myIcon from './Ikona.png';
import Data from './data.xml';
import Notes from './data.csv';
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

function component() {
  const element = document.createElement('div');
  element.classList.add('hello');

  element.textContent = myName("Mephistopheles");

  
  return element;
}


function Icon() {
  const icon = new Image();
  icon.src = myIcon;

  return icon;
}

console.log(Data);
console.log(Notes);

document.body.appendChild(component());
// document.body.appendChild(Icon());