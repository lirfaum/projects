import './index.scss';

import { getCookie, setCookie } from 'javascripts/tools/cookies.js';

import { contains, forEach } from 'ramda';
import { qs, crElement, getUrlParams } from 'javascripts/tools/helpers.js';

import { infoContainerTemplate } from './tempalate';

const countries = ['AT', 'BE', 'BG', 'GB', 'HU', 'DE', 'GR', 'DK', 'IE', 'ES', 'IT', 'CY', 'LV', 'LT', 'LU', 'MT', 'NL', 'SK', 'SI', 'FI', 'FR', 'HR', 'CZ', 'SE', 'EE', 'PL', 'PT', 'RO'];
const infoContainer = qs('body > .info');
const chidlsContainers = () => [...infoContainer.children];
const alerts = [];

const checkCookiesSet = () => contains(config.geo, countries) && getCookie('seenCookieMsg') !== '1';
const checkInLength = () => chidlsContainers().length == 0 && infoContainer.remove();

checkShowInfo()
.then(() => showOutAlerts());

async function checkShowInfo() {
    forEach(alert => {
        !!getUrlParams().risk && !!alert.risks && alerts.push(alert.risks);
        checkCookiesSet() && !!alert.cookies && alerts.push(alert.cookies);
    }, i18n.alerts);
}

function showOutAlerts() {
  forEach(alert => {
    const container = crElement('div', ['container', 'active']);

    container.innerHTML = infoContainerTemplate(alert);
    qs('button', container).addEventListener('click', () => infoClose(container));
    infoContainer.appendChild(container);
  }, alerts); 
}

function infoClose(container) {
  setCookie('seenCookieMsg', 1);
  container.remove();
  checkInLength();
}
