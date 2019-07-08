export function qs(el, parent = document) {
    return parent.querySelector(el);
}

export function qsa() {
    return [...document.querySelectorAll(...arguments)];
}

export function hasClass(el, className) {
    return [...el.classList].indexOf(className) >= 0;
}
/*
* el  - sting - tag
* classes - array - classes
* attributes - obj attribute: value
*/
export function crElement(el, classes = false, attributes = false) {
    const element = document.createElement(el);
    classes && classes.forEach(name => element.classList.add(name));
    if (attributes) {
        for (let attr in attributes) {
            element.setAttribute(`${attr}`, `${attributes[attr]}`);
        }
    }

    return element;
}

// get url params

export function getUrlParams() {
    const obj = {};

    location.search.substr('1')
        .split('&')
        .map( x => obj[ x.split('=')[0] ] = x.split('=')[1] );

    return obj;
}
