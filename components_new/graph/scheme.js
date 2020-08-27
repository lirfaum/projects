import { crElement } from 'javascripts/tools/helpers';

export const scheme = {
  "div": {
    "@class": "wiget",
    "div": {
      "@class": "traiders"
      //p.name
    },
    "div": {
      "@class": "main-info",
      "div": {
        "@class": "user-info",
        "div": {
          "@class": "info-items"
          //.info-item
        },
        "div": {
          "@class": "achivments",
          //.achivment
          "div": {
            "@class": "checkbox"
          }
        }
      },
      "div": {
        "@class": "graph",
        "h3": "some text",
        "div": {
          "@class": "graph-wrap",
          "div": {
            "@id": "graph",
          },
        }
      }
    }
  }
};

export const profitBlock = summ => {
  const bl = crElement('div', ['sum-block']);
  bl.innerHTML = `
    <p>PROFIT RIGHT NOW:</p>
    <span>${summ}</span>
  `;
  
  return bl;
}

export const achivmentBase = (icon, txt) => {
  return {
    "div": {
      "@class": "achivment",
      "div": {
        "@class": "img-wrap",
        "img": {
          "@class": "image",
          "@src": icon,
        }
      },
      "p": {
        "@class": "text",
        "span": txt,
      }
    }
  }
};

export const infoItemBase = (title, data) => {
  return {
    "div": {
      "@class": "info-item",
      "h3": `${title}`,
      "p": `${data}`,
    }
  }
};

export const traiderBase = id => {
  return {
      "p": {
      "@class": "name",
      "span": `*${id}`
    }
  }
};

export const checkbox = {
  "div": {
    "@class": "checkbox",
    "p": "Учился на демо-счёте"
  }
};

export const btnTempl = {
  "button": {
    "@class": "btn",
    "@sidebar-control": "sign-up-promo"
  }
}
