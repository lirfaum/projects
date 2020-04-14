import { replace, reduce, append, compose, addIndex, join, slice, forEach } from 'ramda';

const setCookie = (name, val, options = {}) => {
    const value = encodeURIComponent(val);
    let expires = options.expires;
    let updatedCookie = `${name}=${value}`;

    const type = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    const isNumber = val => type(val) == 'number';

    if (isNumber(expires) && expires) {
        const date = new Date();

        date.setTime(date.getTime() + expires * 1000);
        expires = options.expires = date;
    }

    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    for (const propName in options) {
        updatedCookie += `; ${propName}`;
        const propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += `=${propValue}`;
        }
    }
    document.cookie = updatedCookie;
};

const getCookie = name => {
    const matches = document.cookie.match(new RegExp(
        `(?:^|; )${name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches && decodeURIComponent(matches[1]);
};

const removeCookie = (name, options = {}) => {
    setCookie(name, '', { expires: -1, ...options })
};

const removeCookieAllPaths = name => {
    const pathname = location.pathname.replace(/\/$/, '');
    const segments = pathname.split('/');

    const paths = addIndex(reduce)((acc, _, idx) => {
        const path = compose(join('/'), slice(0, idx + 1))(segments);

        return compose(
            append(`${path}/`),
            append(path),
        )(acc);
    }, [], segments);

    forEach(path => removeCookie(name, { path }), paths);
};

const checkCookieData = name => {
    const val = getCookie(name);
    if (!val) return;
    const match = val.split('--');
    if (match.length > 1) {
        setCookie(name, replace(/"/g, '', window.atob(match[0])));
    }
};

export { setCookie, getCookie, removeCookie, removeCookieAllPaths, checkCookieData };
