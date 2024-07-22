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
  const siteName = config?.cookiePolicy?.siteName;
  const link = config?.cookiePolicy?.cookiePolicyPage;

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
          position: config?.consentModal?.position || "bottom left",
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
                  description: `These cookies are essential for the proper functioning of this website. <a href=${extractLinkUrl(
                    link
                  )} target=${link?.linkTarget} rel=${
                    link?.linkTarget === "_blank" ? "noopener noreferrer" : ""
                  }>Read more</a>.`,
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
                  description: `For any queries in relation to ${siteName}\'s policy on cookies and your choices, please <a href=${extractLinkUrl(
                    link
                  )} target=${link?.linkTarget} rel=${
                    link?.linkTarget === "_blank" ? "noopener noreferrer" : ""
                  }>contact us</a>.`,
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

function extractLinkUrl(link: any) {
  if (!link || !link?.linkType) {
    return;
  }

  //home page
  if (
    link?.type === "linkInternal" &&
    link?.internalLink?.toLowerCase()?.includes("home")
  ) {
    return "/";
  }

  if (link?.linkType === "linkExternal" && link?.linkExternal) {
    return link?.linkExternal;
  }

  if (link?.linkType === "linkInternal" && link?.linkInternal) {
    return `/${link?.linkInternal}`;
  }

  return "/";
}
