import { getLocale, checkLocale } from './get-locale';

function redirectToLand(path) {
    window.location.replace(`${location.origin}/${checkLocale()}/promo/${path}/${window.location.search}`);
}

function redirectToTrading() {
    window.location.replace(getLinkToTrading());
}

function getLinkToTrading() {
    return `${location.origin}/${checkLocale()}/trading${window.location.search}`
}

export { redirectToLand, redirectToTrading, getLinkToTrading }
