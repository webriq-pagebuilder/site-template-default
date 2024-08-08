import React, { useEffect } from "react";
import { CookiesProps } from ".";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { extractLink } from "helper";

function VariantA({
  title,
  description,
  allowCookieBtn,
  denyCookieBtn,
  config,
  contactLink,
}: CookiesProps) {
  const siteName = config?.cookiePolicy?.siteName;
  const cookieConfigLink = config?.cookiePolicy?.cookiePolicyPage;
  const cookieModalPosition = config?.cookiePolicy?.consentModal?.position;

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
          position: cookieModalPosition,
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title,
              description:
                "Cookies help us deliver our services. By using our services, you agree to our use of cookies.",
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
                  description: `These cookies are essential for the proper functioning of this website. <a href=${extractLink(
                    cookieConfigLink
                  )} target=${cookieConfigLink?.linkTarget} rel=${
                    cookieConfigLink?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : ""
                  }>${config?.cookiePolicy?.cookiePolicyPage?.label}</a>.`,
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
                  description: `For any queries in relation to ${siteName}\'s policy on cookies and your choices, please <a href=${extractLink(
                    contactLink
                  )} target=${contactLink?.linkTarget} rel=${
                    contactLink?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : ""
                  }>${contactLink?.label}</a>.`,
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
