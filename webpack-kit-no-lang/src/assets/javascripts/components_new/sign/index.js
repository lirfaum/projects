import './index.scss'

import { forEach } from 'ramda';

import { qs, qsa, crElement, hasClass } from 'javascripts/tools/helpers';
import { getCookie } from 'javascripts/tools/cookies';


import { loop } from 'javascripts/tools/templateTools';
import { signUp } from './signUp';
import { signIn } from './signIn';


const headerScheme = theme => {
    return {
        "header": {
            "@class":"header",
            "ui-logo": {
                "@theme": `${theme == 'dark' ? 'light' : 'dark'}`,
            },
        },
    };
};

const tabsScheme = () => {
    return {
        "div": {
            "@class": "tabs-container active",
            "div": [
                {
                    "@class": "tab active",
                    "@name": "up",
                    "span": i18n.common.menu._sign_up,
                },
                {
                    "@class": "tab",
                    "@name": "in",
                    "span": i18n.common.menu.sign_in,
                }
            ]
        }
    }
}

export class Form extends HTMLElement {
    constructor(theme = 'light', mod = false) {
        super();
        this.params = this.attributes;
        this.name = 'sign';
        this.theme = this.params.theme.value || theme;
        this.config = null;
        this.modification = this.params.mod || mod || '';
        this.scheme = !!this.modification ? 'minScheme' : 'fullScheme';
        this.blocked_settings = () => this.config.blocking_settings;
        this.authorized =  () => config.authorized;
        this.deviceId = getCookie('device_id');
        this.authToken = getCookie('authtoken');
        this.wrap = crElement('div', ['wrap', 'fc-t'], {name: this.name});
    }

    prepandForm() {
        const rowItems = [];
        !(!!this.params.noswap.value) && rowItems.push(loop(tabsScheme()));
        rowItems.push(crElement("ui-sign-up", ['active'], { 'mod': this.modification, 'scheme': this.scheme }));
        rowItems.push(crElement("ui-sign-in"));

        forEach(item => this.wrap.appendChild(item), rowItems);
    }

    activeSwap() {
        const tabs = [...this.wrap.querySelectorAll('.tabs-container .tab')];
        const forms = [...this.wrap.children].slice(1);
        const toggle = () => {
            forEach( tab => tab.classList.toggle('active'), tabs)
            forEach( form => form.classList.toggle('active'), forms)
        }

        const initToggleForms = tab => !hasClass(tab, 'active') && toggle()
        forEach(tab => tab.addEventListener('click', () => { initToggleForms(tab) }), tabs);

    }


    connectedCallback() {
        this.appendChild(loop(headerScheme(this.theme)));

        this.apiConnect('');
        this.prepandForm();
        !(!!this.params.noswap.value) && this.activeSwap();
        this.appendChild(this.wrap);
        
    }
}

customElements.define('ui-form', Form);
