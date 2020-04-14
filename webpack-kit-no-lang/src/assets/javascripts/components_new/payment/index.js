import './index.scss'

import { forEach } from 'ramda';

import { crElement } from 'javascripts/tools/helpers';
import { getLocale } from 'javascripts/tools/get-locale';

import { localeGroups } from './gpoups';

class Payment extends HTMLElement {
    constructor() {
        super();
        this.locale = getLocale();
        this.params = this.attributes;
        this.mod = !!this.attributes.mod && !!this.attributes.mod.value;
        this.limit = !!this.params.limit ? this.params.limit : 30;
        this.afterInnerBlock = this.innerHTML;
        this.out = '';
    }

    createImagesBlocks() {
      const image = obj => {
        const imageContainer = crElement('div', ['payment-image']);
        const path = require(`images/payment-group${this.mod ? '/gray/' : '/'}${obj.img}.svg`);
        const imageBlock = crElement('img', false, { src: `${path}`, alt: `${obj.img}`});

        this.appendPaymentBlock(imageContainer, imageBlock, obj.name);
      };

      localeGroups[this.locale].forEach( (img, index) => {
        if (!!this.params.limit) {
          (index < parseInt(this.params.limit.value)) && image(img);
      } else {
          image(img);
        }
      });
    }

    crImageContainer(image) {
      const imageWithName = crElement('div', false);
      imageWithName.appendChild(image);

      return imageWithName;
    }

    appendPaymentBlock(container, img, name) {
      switch (!!this.params.mod) {
        case true:
          container.appendChild(this.crImageContainer(img));
          container.innerHTML += `<p>${!!name ? name : ''}</p>`
          this.out += container.outerHTML;
          break;
        case false:
          container.appendChild(img)
          this.out += container.outerHTML;
          break;
      }
    }

    connectedCallback() {
      this.createImagesBlocks();
      this.innerHTML = `${this.out}${this.afterInnerBlock}`;
  }
}

customElements.define('payment-group', Payment);
