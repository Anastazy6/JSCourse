import _ from 'lodash';
import myName from './myName';
import './style.css';
import myIcon from './Ikona.png';
import Data from './data.xml';
import Notes from './data.csv';

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