import './index.scss'

import { crElement } from 'javascripts/tools/helpers';

class Footer extends HTMLElement {
    constructor() {
        super();
        this.locale = i18n.locale;
        this.params = this.attributes;
        this.afterInnerBlock = this.innerHTML;
        this.out = '';
    }

    createTopBlock() {
      const topBlock = crElement('div', ['footer-inner']);
      const container = crElement('div', ['footer-container']);
      const text = crElement('p', ['footer-text']);

      text.innerText = i18n.footer;
      if (!!this.params.dark) {
        container.appendChild(crElement('ui-logo', false, {theme: 'light'}));
      } else {
        container.appendChild(crElement('ui-logo', false, {theme: 'dark'}));
      }
      if (!!this.innerHTML) {
        const additionalInfoContainer = crElement('div', ['footer-text']);

        additionalInfoContainer.innerHTML = this.innerHTML;
        container.appendChild(additionalInfoContainer);
      }
      container.appendChild(text);

      topBlock.appendChild(container);

      return topBlock;
    }

    createBottomBlock() {
      const bottomBlock = crElement('div', ['footer-inner']);
      const container = crElement('div', ['footer-container']);
      const copyright = crElement('p', ['copyright']);
      
      copyright.innerText = `© 2014 - ${new Date().getUTCFullYear()}`
      container.appendChild(copyright);
      container.appendChild(crElement('social-icons', false, {theme: !!this.params.dark ? 'dark' : 'light'}));
      bottomBlock.appendChild(container);

      return bottomBlock;
    }

    getCopyright() {
      const copyContainer = crElement('p', ['copyright']);
      const copyText = `© 2014 - ${new Date().getUTCFullYear()}`;

      copyContainer.innerText = copyText;

      return copyContainer;
    }

    resolver() {
      const wrapper = crElement('footer');
      const topBlock = this.createTopBlock();
      const bottomBlock = this.createBottomBlock();

      !!this.params.nobg && this.classList.add('nobg');
      !!this.params.dark && this.classList.add('dark');

      wrapper.appendChild(topBlock);
      wrapper.appendChild(bottomBlock);

      return wrapper;
    }

    connectedCallback() {
      this.out = `${this.resolver().outerHTML}`;
      this.innerHTML = `${this.out}`;
  }
}

customElements.define('ui-footer', Footer);
