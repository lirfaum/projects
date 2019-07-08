import { api } from 'javascripts/components/api-config/api-config';
import { redirectToLand, redirectToTrading } from './redirectTo';
import isMobile from 'ismobilejs';

const name = location.pathname.replace(/\.html\/?$/g, '').split('/').filter(i => !!i)[2];

const pages = {
  mobile: ['l4', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12', 'l15', 'l22', 'l27', 'l28', 'l31', 'l32', 'l33', 'l34', 'l35', 'l38', 'l40', 'l41', 'l42', 'android', 'islamicaccount', 'vvt', 'newyear'],
  always: ['l5', 'l34', 'android', 'vvt', 'newyear'],
};

api(config => {
  if (config.authorized) {
    if (pages.always.indexOf(name) < 0) {
      redirectToTrading();
    }
  } else if (pages.mobile.indexOf(name) < 0 && isMobile.phone) {
    redirectToLand('l22');
  }
});
