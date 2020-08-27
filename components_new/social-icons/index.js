import './index.scss'

import { filter, mapObjIndexed } from 'ramda';

import { crElement } from 'javascripts/tools/helpers';

import { socialGroups } from './social-groups';

export class SocialIcons extends HTMLElement {
    constructor() {
        super();
        this.locale = i18n.locale;
        this.params = this.attributes;
        this.currentList = this.filterSocialsList();
        this.out = crElement('div', ['social-container']);
    }

    filterSocialsList() {
      return filter( x => x !== '', socialGroups[this.locale]);
    }

    setLink(href, key) {
      const link = crElement('a',
        ['social-link'],
        { href: href, target: '_blank' });
      const i = crElement('i', [`n-icon-${key}`]);

      link.appendChild(i);
      this.out.appendChild(link);
    }

    connectedCallback() {
      mapObjIndexed((href, key) => this.setLink(href, key), this.currentList);
      this.appendChild(this.out);
  }
}

customElements.define('social-icons', SocialIcons);
