import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { Variants } from "types";

function VariantE({
  heading,
  block,
  acceptButtonLabel,
  declineButtonLabel,
}: Variants) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {!showCookie
        ? heading && (
            <div className="mx-4 mb-6 max-w-md rounded-lg bg-gray-800 pt-8 text-white md:mx-0 md:ml-10">
              <div className="px-8 text-center">
                <p className="font-heading font-bold">{heading}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
              </div>
              <div className="flex border-t border-gray-700 text-center">
                {declineButtonLabel && (
                  <button
                    aria-label="Deny Cookies button"
                    type="button"
                    className="inline-block w-1/2 rounded-bl-lg border-r border-gray-700 py-4 text-sm font-bold transition duration-200 hover:bg-gray-700"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {declineButtonLabel}
                  </button>
                )}
                {acceptButtonLabel && (
                  <button
                    aria-label="Allow Cookies button"
                    type="button"
                    className="inline-block w-1/2 rounded-br-lg py-4 text-sm font-bold text-webriq-lightblue transition duration-200 hover:bg-webriq-babyblue"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {acceptButtonLabel}
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
