import './index.scss'

import { forEach } from 'ramda';

import { recaptcha } from 'javascripts/components/recaptcha/recaptcha';

import { qs, crElement, capitalize } from 'javascripts/tools/helpers';
import { plusToDate } from 'javascripts/tools/plusDate';
import { getLocale } from 'javascripts/tools/get-locale';
import { redirectToTrading } from 'javascripts/tools/redirectTo';
import { setCookie, getCookie } from 'javascripts/tools/cookies';


import { loop } from 'javascripts/tools/templateTools';
import { Social } from 'javascripts/components/social';

import { getModal } from './modals-Scheme';
import { minAgreement } from './agreement-template';
import { tooltip } from './tooltip-template';

export class SignUp extends HTMLElement {
    constructor(name, theme = '', mod = false) {
        super();
        this.name = name || 'signUp';
        this.config = null;
        this.theme = '';
        this.scheme = () => Object.assign({ 'mod': !!this.attributes.mod.value, 'scheme': this.attributes.scheme.value}, {});
        this.blocked_settings = () => this.config.blocking_settings;
        this.authorized =  () => config.authorized;
        this.deviceId = getCookie('device_id');
        this.authToken = getCookie('authtoken');
        this.signForm = crElement('form', ['sign-form'], {name: this.name});
    }

    initPasswordHelper() {
        const helperBtn = qs('.password-group .helper', this.signForm);
        const inputPswd = qs('input[name="password"]', this.signForm);

        helperBtn.addEventListener('mousedown', () => {
            inputPswd.setAttribute('type', 'text');
        });

        helperBtn.addEventListener('mouseup', () => {
            inputPswd.setAttribute('type', 'password');
        });
    }

    showErrors(errors) {
        forEach(err => {
            const label = qs(`[name="${err.field}"]`, this.signForm);

            if (!!label) {
                label.innerHTML += tooltip(err.message);

                label.addEventListener('click', () => {
                    qs('.tooltip-container', label).remove();
                })
            }
        }, errors)
    }

    prepandForm() {
        const params  = this.scheme();
        const scheme = require(`./signUp-${params.scheme}`);
        this.signForm.appendChild(loop(scheme[`${params.scheme}`]));
        qs('.form-group.email-group', this.signForm).appendChild(crElement('social-auth'));
        qs('.agreement', this.signForm).innerHTML += minAgreement(getLocale());
        if (!params.mod) {
            this.currencies();
            this.initPasswordHelper();
        }
        // this.hidePreloader();
        qs('.fieldset > div', this.signForm).classList.add('fade-ftop-nested');
        qs('button', this.signForm).addEventListener('click', () => this.send());
    }

    // nameToPlaceholder() {
    //     const emailTitle = qs('label.email .form-title', this.signForm);
    //     const passwTitle = qs('label.password .form-title', this.signForm);
    //     qs('input[name=email]', this.signForm).setAttribute('placeholder', emailTitle.innerHTML);
    //     qs('input[name=password]', this.signForm).setAttribute('placeholder', passwTitle.innerHTML);
    // }

    currencies() {
        const checkDefault = curr => this.config.currencies.default === curr.iso ? 'checked' : '';
        this.config.currencies.list.forEach( curr => {
            const container = qs('.currencies', this.signForm);
            const template = `<label class="currency-label">
                <input name="currency" type="radio" value="${curr.iso}" ${checkDefault(curr)}>
                <span class="ico-container">
                    <span class="ico">${curr.unit}</span>
                </span>
            </label>`;
            qs('.currencies', this.signForm).innerHTML += template;
        })
    }

    getFormData() {
        const data = new FormData(this.signForm);
        if(this.scheme().mod) {
            data.set('password', capitalize(Math.random().toString(36).slice(-8)));
            data.set('i_agree', 'on');
            data.set('currency', this.config.currencies.default);
        }
        return data;
    }


    send() {
        event.preventDefault();
        fetch(getSignUpUrl(), {
            method: 'POST',
            credentials: 'include',
            body: this.getFormData(),
            headers: {
                'Device-Id': this.deviceId,
                'Device-Type': 'web',
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // this.prepend(getModal('success'));
                setCookie('authtoken', response.data.authtoken, {
                    path: '/',
                });
                setCookie('agreed', true, {
                    expires: plusToDate(new Date(), 100, 'year'),
                    path: '/',
                });
                setCookie('isFirstSession', true, {
                    expires: plusToDate(new Date(), 1, 'hour'),
                    path: '/',
                });
                redirectToTrading();
            } else {
                switch (response.errors[0].field) {
                    case 'g-recaptcha-response' :
                        recaptcha(this.signForm, 'invisible');
                        this.send();
                    case 'blocked_country':
                        this.prepend(getModal('blocked'))
                    default:
                        this.showErrors(response.errors);
                }
            }
        })
        .catch(err => console.error('!!!>>', err));
    }

    connectedCallback() {
        this.apiConnect('');
        this.prepandForm();
        this.appendChild(this.signForm),
        // show errors comment
        // this.showErrors([{"field":"email","message":"You must enter an E-mail address","code":"blank"},{"field":"i_agree","message":"You must accept terms and conditions","code":"blank"},{"field":"password","message":"You must accept terms and conditions","code":"blank"}]);
        setTimeout(() => { qs('.fieldset > div', this.signForm).classList.add('active') }, 300);
    }
}

customElements.define('ui-sign-up', SignUp);
