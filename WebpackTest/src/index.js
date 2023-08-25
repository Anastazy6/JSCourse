import _ from 'lodash';
import myName from './myName';
import './style.css';
import myIcon from './Ikona.png';

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

document.body.appendChild(component());
// document.body.appendChild(Icon());