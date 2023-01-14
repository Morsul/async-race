import './index.css';
import { divClassName } from './basic';
function component() {
  const element = document.createElement('div');
  const elementClass: divClassName = { className: 'hello' };

  element.innerHTML = 'test2';
  element.classList.add(elementClass.className);

  return element;
}

document.body.appendChild(component());
