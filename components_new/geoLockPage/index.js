import './index.scss'
import { qs } from 'javascripts/tools/helpers';
import { loop } from 'javascripts/tools/templateTools';

const popupTemplate = {
  "div": {
    "@class": "lock active",
    "div": {
      "@class": "lock-popup",
      "div": {
        "@class": "container",
      }
    }
  }
};

const content = `
  <h4>
    В вашей стране использование Binomo недоступно
  </h4>
  <p>
    Если вы считаете сообщение ошибочным,
    напишите нам на <a href="mailto:support@binomo.com">support@binomo.com</a>
  </p>
`;

const blurInit = () => [...document.body.children].forEach(child => child.style.filter = 'blur(25px)');
const appendPopup = () => {
  const popup = loop(popupTemplate);
  qs('.container', popup).innerHTML = content;
  document.body.appendChild(popup);
};

const initLock = () => { blurInit(); appendPopup() };

fetch('/static/geo')
  .then(res => res.text())
  .then(res => (res.toLowerCase() == 'ru') && initLock())
  .catch(error => console.error('Geo fetch error:', error));
