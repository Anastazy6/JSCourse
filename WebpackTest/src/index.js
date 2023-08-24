import _ from 'lodash';
import myName from './myName';
import './style.css';

function component() {
  const element = document.createElement('div');
  element.classList.add('hello');

  element.textContent = myName("Mephistopheles");

  return element;
}

document.body.appendChild(component());