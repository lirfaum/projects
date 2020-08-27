import { qs } from 'javascripts/tools/helpers.js';

export function popupOpen(classNamePopup, doSomeAfterFunc = undefined) {
    const popup = qs(`.popup.${classNamePopup}`);
    popup.classList.add('active');
    popupClose(doSomeAfterFunc);
}

function cleanListnerAfterClose(activePopup, after) {
    activePopup.classList.remove('active'); 
    activePopup.removeEventListener('click', activePopup.classList.remove('active'))
    doSomAfter(after);
}

function popupClose(afterFunction) {
    const activePopup = qs('.popup.active');
    const closeButton = qs('.popup.active .close');
    activePopup.addEventListener('click', event => {
        if (!event.target.closest(".form-wrapper"))
            cleanListnerAfterClose(activePopup, afterFunction);
    });
    closeButton.addEventListener('click', () => { 
        cleanListnerAfterClose(activePopup, afterFunction);
    });
}

function doSomAfter(handler) {
    handler != undefined && handler();
}
