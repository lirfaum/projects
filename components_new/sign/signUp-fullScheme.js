export const fullScheme = {
  "div": {
    "@class": "form form-sign",
    "@name": "signUp",
    "div": [
      {
        "@class": "fieldset",
        "div": [
          {
            "@class": "form-group currency-group",
            "div": [
              {
                "@class": "group-title",
                "text": i18n.common.registration.label.currency,
              },
              {
                "@class": "currencies"
              }
            ]
          },
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
                "@class": "helper",
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
             "text": i18n.common.start
            },
            "div": {
              "@class": "g-recaptcha-response"
            }
          },
          {
            "@class": "form-group agreement-group",
            "label": {
              "@class": "agreement-label field",
              "@name": "i_agree",
              "div": {
                "@class": "agreement",
                "input": {
                  "@name": "i_agree",
                  "@type": "checkbox"
                },
                "span": {
                  "@class": "custom-check"
                }
              },
            }
          }
        ]
      }
    ]
  }
}

