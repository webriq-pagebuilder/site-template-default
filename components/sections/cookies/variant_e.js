import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

function VariantE({ title, block, allowCookieBtn, denyCookieBtn }) {
  const [showCookie, setShowCookie] = React.useState(() => getCookie());

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie
        ? title && (
            <div className="max-w-md mx-4 md:mx-0 md:ml-10 mb-6 pt-8 bg-gray-800 text-white rounded-lg">
              <div className="px-8 text-center">
                <p className="font-bold font-heading">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
              </div>
              <div className="flex border-t border-gray-700 text-center">
                {denyCookieBtn && (
                  <button
                    aria-label="Deny Cookies button"
                    type="button"
                    className="inline-block w-1/2 py-4 text-sm rounded-bl-lg border-r border-gray-700 font-bold hover:bg-gray-700 transition duration-200"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {denyCookieBtn}
                  </button>
                )}
                {allowCookieBtn && (
                  <button
                    aria-label="Allow Cookies button"
                    type="button"
                    className="inline-block w-1/2 py-4 text-sm rounded-br-lg text-webriq-lightblue font-bold hover:bg-webriq-babyblue transition duration-200"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {allowCookieBtn}
                  </button>
                )}
              </div>
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantE);
