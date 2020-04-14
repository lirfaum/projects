export const agreement = locale =>`
  <span class="description">
    <span>${i18n.common.registration.label.i_agree}</span>
    <a href="${locale}/information/agreement" target="_blank">
        <span>${i18n.common.registration.label.agreement}</span>
    </a>
    <span>${i18n.common.and}</span>
    <a href="${locale}/information/privacy" target="_blank">
        <span>${i18n.common.registration.label.privacy}</span>
    </a>
  </span>
`;

export const minAgreement = locale => {
  const translateNewAgreement = !!i18n.land && !!i18n.land.privacytext;
  const agreementTpl = translateNewAgreement ? 
    `<p class="sign-privacy tac"> ${i18n.land.privacytext}</p>` : agreement(locale);
  
  return agreementTpl;
}
