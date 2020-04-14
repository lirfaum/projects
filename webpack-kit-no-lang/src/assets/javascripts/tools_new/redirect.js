
import { redirectToLand, redirectToTrading } from './redirectTo';

const name = location.pathname.replace(/\.html\/?$/g, '').split('/').filter(i => !!i)[2];

const lands = {
  // mobile: ['l4', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12', 'l15', 'l17', 'l22', 'l27', 'l28', 'l31', 'l32', 'l33', 'l34', 'l35', 'l38', 'l40', 'l41', 'l42', 'android', 'islamicaccount', 'vvt', 'newyear', 'king', 'l35gd', 'l43', 'l19', 'l44', 'l16','l69'],
  always: ['l5', 'l16', 'l34', 'android', 'vvt', 'newyear', 'king', 'l43', 'l19', 'l69'],
};

// api(config => {
//   if (config.authorized) {
//     if (lands.always.indexOf(name) < 0) {
//       redirectToTrading();
//     }
//   } else {
//     // for Criteo dataLayer
//     dataLayer.push({
//       "userAuth":"0",
//     });
//   }
// });
