import './index.scss'

import { crElement, qs } from 'javascripts/tools/helpers';

export class Logo extends HTMLElement {
  constructor() {
      super();
      this.locale = i18n.locale;
      this.container = crElement('div', ['logo-container']);
      this.params = this.attributes;
  }

  static observedAttributes = ['theme'];

  getImageSrc() {
    return '' 
    //this.params.theme.value == 'dark' ? require('images/logo.svg') : require('images/logo-white.svg');
  }

  getInnerText() {
    const descContainer = crElement('span', ['logo-desc']);

    descContainer.innerHTML = this.innerHTML;
    this.innerHTML = '';

    return descContainer;
  }

  attributeChangedCallback(oldValue, newValue) {
    !!newValue && !!oldValue && oldValue !== newValue && this.update(name)
  }

  getLink() {
    return `${location.origin}/${this.locale}?${location.search}`;
  }

  resolver() {
    const link = crElement('a', ['logo-link'], { href: this.getLink(), target: '_blank' });
    const logoImg = crElement('img', ['image'], { src: this.getImageSrc() });
    const description = !!this.params.desc ? this.getInnerText() : '';

    link.appendChild(logoImg);
    this.container.appendChild(link);

    if (description) {
      this.container.appendChild(description);
    }

    return this.container;
  }

  update() {
    qs('img', this).setAttribute('src', this.getImageSrc());
  }

  connectedCallback() {
    this.appendChild(this.resolver());
  }
}

customElements.define('ui-logo', Logo);
