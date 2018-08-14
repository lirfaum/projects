// export function qs() {
//     return document.querySelector(...arguments);
// }

export function qs(el, parent = document) {
    return parent.querySelector(el);
}

export function qsa() {
    const nodeList = document.querySelectorAll(...arguments);
    return [...nodeList];
}