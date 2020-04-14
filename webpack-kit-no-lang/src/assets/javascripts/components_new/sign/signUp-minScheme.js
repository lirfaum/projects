export const minScheme = {
  "div": {
    "@class": "form form-sign",
    "@name": "signUp",
    "div": [
      {
        "@class": "fieldset",
        "div": [
          {
            "@class": "form-group email-group",
            "label": {
              "@class": "email-label field",
              "@name": "email",
              "input": {
                "@name": "email",
                "@type": "email",
                "@placeholder": "example@mail.com"
              }
            }
          },
          {
            "@class": "form-group submit-group",
            "button": {
              "@class": "submit",
             "text": i18n.common.start
            },
            "div": {
              "@class": "g-recaptcha-response"
            }
          },
        ],
      },
      {
        "@class": "agreement",
      }
    ]
  }
}

