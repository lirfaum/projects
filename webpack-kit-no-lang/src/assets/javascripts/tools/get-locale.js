export function getLocale() {
    return location.pathname.split('/')[1];
}

export const checkLocale = function checkFallbak() {
    const locale = getLocale();

    return locale == 'hi' ? 'en' : locale;
}
