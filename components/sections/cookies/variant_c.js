import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

function VariantC({ title, block, allowCookieBtn, denyCookieBtn }) {
  const [showCookie, setShowCookie] = React.useState(() => getCookie());

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie
        ? title && (
            <div className="max-w-md p-6 px-10 mx-4 md:mx-0 md:ml-10 mb-6 bg-gray-800 text-white rounded-lg">
              <div className="text-center">
                <p className="font-bold font-heading">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
                {allowCookieBtn && (
                  <button
                    aria-label="Allow Cookies button"
                    type="button"
                    className="inline-block mr-4 py-2 px-4 rounded-l-xl rounded-t-xl border-2 border-webriq-darkblue bg-webriq-darkblue hover:bg-webriq-blue hover:border-webriq-blue transition duration-500"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {allowCookieBtn}
                  </button>
                )}
                {denyCookieBtn && (
                  <button
                    aria-label="Deny Cookies button"
                    type="button"
                    className="inline-block m-2 py-2 px-4 rounded-r-xl rounded-t-xl border-2 border-gray-400 hover:bg-gray-700 transition duration-500"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {denyCookieBtn}
                  </button>
                )}
              </div>
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantC);
