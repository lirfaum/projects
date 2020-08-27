import { loop } from 'javascripts/tools/templateTools';
import { getLinkToTrading } from 'javascripts/tools/redirectTo';

const modalsBase = () => {
  return {
    "div": {
      "@class": "modal success fade-in-parent-ftop",
      "@name": "success",
      "div": {
        "@class": "container",
      },
      "a": "Start trading"
    },
  };
};


const modalContent = name => {
  const base = modalsBase();
  switch (name) {
    case 'blocked':
        base.div.div["p"] = 'sry blocked';
        base.div.div["a"] = {
          "@href":"mailto:support@binomo.com",
          "@target":"_blank",
          "span": "support@binomo.com",
        }
        return base;
    case 'success':
        base.div.div["p"] = 'sry blocked';
        base.div.div["a"] = {
          "@href":`${getLinkToTrading()}`,
          "@target":"_blank",
          "span": "To trading",
        }
        return base;
    default:
        break;
  }
}

export const getModal = name => {
  const map = modalContent(name);
  return loop(map);
}
