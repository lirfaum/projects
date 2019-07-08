import './index.scss'

import { forEach } from 'ramda';
import { qs, crElement} from 'javascripts/tools/helpers';

/**
 * obj - array - сами данные
 */
export class DropDown extends HTMLElement {
  constructor(obj, name = 'dropdown') {
    super();
    this.obj = obj;
    this.container = crElement('div', ['dropdown-wrapper'], {name: name});
    this.titleContainer = crElement('div', ['dropdown-title']);
    this.listContainer = crElement('div', ['dropdown-list']);
  }

  buildList() {
    this.listContainer.innerHTML = '';

    forEach(li => {
      const item = crElement('div', ['item']);
      const itemTitle = crElement('span');

      itemTitle.innerText = li;

      item.appendChild(itemTitle);
      this.listContainer.appendChild(item);
    }, this.obj);
  }

  initToggleList() {
    this.titleContainer.addEventListener('click', () => {
        this.container.classList.toggle('active');
    });
  }

  initLinks() {
    forEach(item => {
      item.addEventListener('click', () => { 
        qs('.active', this.listContainer).classList.remove('active');
        item.classList.add('active');
        this.titleContainer.innerText = qs('span', item).innerText;
        this.container.classList.toggle('active');
      });
    }, [...this.listContainer.children]);
  }

  setDefault() {
    this.listContainer.children[0].classList.add('active');
    this.titleContainer.innerText = this.listContainer.children[0].innerText;
  }

  update(newObj) {
    const newTitle = this.titleContainer.cloneNode(true);
    this.obj = newObj;
    this.titleContainer.parentNode.replaceChild(newTitle, this.titleContainer);
    this.titleContainer = qs('.dropdown-title', this.container);
    this.init();
  }

  init() {
    this.buildList();
    this.setDefault();
    this.initToggleList();
    this.initLinks();
  }

  setMaxHeight() {
    const elHeight = this.listContainer.firstElementChild.offsetHeight;
    const elementsCount = this.listContainer.children.length;

    elementsCount < 7 && this.listContainer.setAttribute('style', `max-height:${elementsCount * elHeight + 10}px;`)
    elementsCount >= 7 && this.listContainer.setAttribute('style', `max-height:${7 * elHeight + 10}px;`)
  }

  connectedCallback() {
    this.init();
    this.container.appendChild(this.titleContainer);
    this.container.appendChild(this.listContainer);

    this.appendChild(this.container);
    this.setMaxHeight();
  }
}

customElements.define('ui-dropdown', DropDown);
