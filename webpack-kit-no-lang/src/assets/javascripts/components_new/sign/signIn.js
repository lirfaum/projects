import './index.scss'

import { forEach } from 'ramda';

import { recaptcha } from 'javascripts/components/recaptcha/recaptcha';

import { qs,crElement } from 'javascripts/tools/helpers';
import { redirectToTrading } from 'javascripts/tools/redirectTo';
import { setCookie, getCookie } from 'javascripts/tools/cookies';


import { loop } from 'javascripts/tools/templateTools';
import { scheme } from './singIn-Scheme';
import { tooltip } from './tooltip-template';

export class SignIn extends HTMLElement {
    constructor(name) {
        super();
        this.name = name || 'signIn';
        this.config = null;
        this.blocked_settings = () => this.config.blocking_settings;
        this.authorized =  () => config.authorized;
        this.deviceId = getCookie('device_id');
        this.authToken = getCookie('authtoken');
        this.signForm = crElement('form', ['sign-form'], {name: this.name});
        this.params = {...this.attributes};
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
        this.signForm.appendChild(loop(scheme))
        qs('.form-group.email-group', this.signForm).appendChild(crElement('social-auth'))
        this.initPasswordHelper();
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

    send() {
        event.preventDefault();
        fetch(getSignInUrl(), {
            method: 'POST',
            credentials: 'include',
            body: new FormData(this.signForm),
            headers: {
                'Device-Id': this.deviceId,
                'Device-Type': 'web',
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // this.showModal('success');
                setCookie('authtoken', response.data.authtoken, {
                    path: '/',
                });
                redirectToTrading();
            } else {
                switch (response.errors[0].field) {
                    case 'g-recaptcha-response' :
                        recaptcha(this.signForm, 'invisible');
                        this.send();
                    case 'blocked_country':
                        this.showModal('blocked', i18n.common.registration.blocked_country_placeholder)
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
        // this.showErrors([{"field":"email","message":"You must enter an E-mail address","code":"blank"},{"field":"i_agree","message":"You must accept terms and conditions","code":"blank"},{"field":"password","message":"You must accept terms and conditions","code":"blank"}]);
        setTimeout(() => { qs('.fieldset > div', this.signForm).classList.add('active') }, 300);
    }
}

customElements.define('ui-sign-in', SignIn);
