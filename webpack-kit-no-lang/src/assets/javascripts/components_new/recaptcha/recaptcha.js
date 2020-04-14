import { qs } from 'javascripts/tools/helpers.js';
import { getLocale } from 'javascripts/tools/get-locale.js';

const recaptchaSiteKey = '6Lc2WiQUAAAAAF3m65asH6KKROD4l5R_ld997Rlm';

export function recaptcha(form = qs('form'), size = null) {
    if (!qs('script#recaptcha')) {
        const recaptchaApi = document.createElement('script');

        recaptchaApi.src = `https://www.google.com/recaptcha/api.js?hl=${getLocale()}`;
        recaptchaApi.setAttribute('async', '');
        recaptchaApi.setAttribute('defer', '');
        recaptchaApi.setAttribute('id', 'recaptcha');
        if (size) {
            recaptchaApi.setAttribute('size', size);
        }
        document.body.appendChild(recaptchaApi);
    }

    const recaptchaTemplate = document.createElement('div');
    recaptchaTemplate.classList.add('g-recaptcha');
    recaptchaTemplate.dataset.sitekey = recaptchaSiteKey;
    recaptchaTemplate.setAttribute('style', 'display:block; margin: 0 auto; transform:scale(0.77);transform-origin:0 0;');

    qs('.g-recaptcha-response', form).appendChild(recaptchaTemplate);
}
