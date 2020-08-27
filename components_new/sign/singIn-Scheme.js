export const scheme = {
  "div": {
    "@class": "form form-sign",
    "@name": "signIn",
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
            "@class": "form-group password-group",
            "label": {
              "@class": "password-label field",
              "@name": "password",
              "div": {
                "@class": "helper"
              },
              "input": {
                "@name": "password",
                "@type": "password",
                "@placeholder": "•••••••"
              }
            }
          },
          {
            "@class": "form-group submit-group",
            "button": {
              "@class": "submit",
             "text": i18n.common.menu.sign_in,
            },
            "div": {
              "@class": "g-recaptcha-response"
            }
          },
        ]
      }
    ]
  }
}
