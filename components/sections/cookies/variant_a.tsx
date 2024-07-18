import React, { useEffect } from "react";
import { CookiesProps } from ".";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

function VariantA({
  title,
  description,
  allowCookieBtn,
  denyCookieBtn,
  config,
}: CookiesProps) {
  useEffect(() => {
    const cookieConfigOptions: CookieConsent.CookieConsentConfig = {
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: config?.enableAnalytics,
        },
      },
      guiOptions: {
        consentModal: {
          position: config?.consentModal?.position,
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title,
              description,
              acceptAllBtn: allowCookieBtn,
              acceptNecessaryBtn: denyCookieBtn || "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
            },
            preferencesModal: {
              title: "Cookie Preferences",
              acceptAllBtn: allowCookieBtn,
              acceptNecessaryBtn: denyCookieBtn || "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close",
              sections: [
                {
                  title,
                  description,
                },
                {
                  title: "Strictly Necessary cookies",
                  description:
                    "These cookies are essential for the proper functioning of this website. <a href='/contact-us'>Read more</a>.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description:
                    "These cookies are used to track and measure the use of this website.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'For any queries in relation to WebriQ\'s policy on cookies and your choices, please <a href="/contact-us">contact us</a>',
                },
              ],
            },
          },
        },
      },
    };

    CookieConsent.run(cookieConfigOptions);
  }, []);

  return <></>;
}

export default React.memo(VariantA);