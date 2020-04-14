import { crElement } from 'javascripts/tools/helpers';

const attrs = (arr, obj) => !!obj ? attrObj(arr, obj) : {};
const attrObj = (arr, obj) => {
  const f = {};
  arr.forEach(at => f[at] = obj['@'+at]);
  return f;
}
const childs = obj => [...Object.keys(obj)
    .filter(x => !x.includes('@'))
    .filter(x => !x.includes('#'))];

const filterArr = obj => [...Object.keys(obj)
    .map(x => x.includes('@') && x.replace('@', ''))
    .filter(x => !!x)
  ];;

const generateChilds = (parent, arr, obj) => {
  if (Array.isArray(obj)) {
    obj.forEach(item => parent.appendChild(crBlock('div', item, parent)))
  } else {
    arr.forEach( c => parent.appendChild(crBlock(c, obj[c])))
  }
}

export const crBlock = (name, opt, prev = false) => {
  const parent = crElement(name, false, attrs(filterArr(opt), opt));

  //toreplace with i18n param
  if(typeof opt == "string"){
    const t = document.createTextNode(opt);
    parent.appendChild(t);
  };
  !!childs(opt).length && typeof opt != "string" && generateChilds(parent, childs(opt), opt);
  return parent;
}
export const isObj = key => typeof key === 'object' && key !== null
export const loop = data => {
  for (let key in data) {
      if (isObj(data[key])) {
          return crBlock(key, data[key]);
      }
  }
}
