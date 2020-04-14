import './index.scss'

import { forEach } from 'ramda';

import { crElement, getUrlParams, qs } from 'javascripts/tools/helpers';
import { getLocale } from 'javascripts/tools/get-locale';
import { setCookie, getCookie } from 'javascripts/tools/cookies';
import { redirectToTrading } from 'javascripts/tools/redirectTo';
import { loop } from 'javascripts/tools/templateTools';
import { tooltip } from '../sign/tooltip-template';



const getSocials = () => {
  // fetch(getSocialsUrl())
  //   .then(res => res.json())
  //   .then(res => console.warn(res))
  return devSocials;
}

const btnScheme = (code, name) => {
  return {
    '@class': `soc-container`,
    'button': {
      '@class': `soc-${code}`,
      '@name': `${name}`,
    }
  }
}

class Social extends HTMLElement {
    constructor() {
        super();
        this.locale = getLocale();
        this.params = this.attributes;
        this.socials = null;
        this.wrap = crElement('div', ['social-wrap']);
    }

  prepandSocials() {
    const btns = [];
    const social = social => btns.push(this.createBtn(social));
    forEach(social, this.socials)
    forEach(btn => this.wrap.appendChild(btn), btns)
  }

  createBtn(socialObj) {
    const linkParams = `&origin=auth`;
    const btn = socData =>loop(btnScheme(socData.code, socData.name));
    const oauthCode = () => !!getUrlParams().oauth_code ? getUrlParams().oauth_code + linkParams : `oauth_code` + linkParams;
    const url = socUrl => `${socUrl}`;
    const btnBlock = btn(socialObj);
    btnBlock.addEventListener('click', event => {
      event.preventDefault()
      this.toSocial(url(socialObj.url))
    });
    return btnBlock;
  }

  toSocial(url) {
    const socWin = window.open(url);
    window.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      console.warn('>>', data);
      switch (data.action) {
        case 'authorized':
          console.warn('BEFORE SET',getCookie('authtoken'));
          setCookie('authtoken', data['data']['authtoken'], {
              path: '/',
          });
          console.warn(data['data']);
          console.warn('AFTER SET',getCookie('authtoken'));
          redirectToTrading();
          break;
        default :
          this.showError(data.data.oauth_code)
          break;
      }
    });
  }

  errMapPathTranslation(path) {
    const pathArr = path.split('.');
    let commonPath = i18n.common;

    for (let i = 0; i < pathArr.length; i++) {
      const currPart = pathArr[i]
      if (currPart == 'messages') { continue; }
      if (!!commonPath[currPart] != undefined) { commonPath = commonPath[currPart] };
    }

    commonPath.split('')
    return commonPath;
  }

  showError(error) {
    const label = this.previousElementSibling;
    const err = this.errMapPathTranslation(error);

    if (!!label) {
        label.innerHTML += tooltip(err);

        label.addEventListener('click', () => {
            qs('.tooltip-container', label).remove();
        })
    }
}


    connectedCallback() {
      // console.warn(getSocials())
      // this.showError('errors.messages.oauth.user_already_exist_sign_in_required');
      this.socials = getSocials().data;
      this.prepandSocials();
      this.appendChild(this.wrap);
  }
}

customElements.define('social-auth', Social);
