import { getCookie, setCookie } from 'javascripts/tools/cookies'

export function getLocale() {
    return getCookie('locale') || getLocaleFromNavigator(navigator.language.substr(0, 2).toLowerCase());
}

function getLocaleFromNavigator(value) {
    setCookie('locale', value, { path: '/' });
    return value;
}

export const checkLocale = function checkFallbak() {
    const locale = getLocale();
    const fallbacks = {
        'ta' : 'en',
        'ma' : 'en',
        'hi' : 'en',
    }

    return Object.keys(fallbacks).includes(locale) ? fallbacks[locale] : locale;
}
