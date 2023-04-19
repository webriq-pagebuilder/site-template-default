import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { Variants } from "types";

function VariantC({
  title,
  block,
  acceptButtonLabel,
  declineButtonLabel,
}: Variants) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {!showCookie
        ? title && (
            <div className="mx-4 mb-6 max-w-md rounded-lg bg-gray-800 p-6 px-10 text-white md:mx-0 md:ml-10">
              <div className="text-center">
                <p className="font-heading font-bold">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
                {acceptButtonLabel && (
                  <button
                    aria-label="Allow Cookies button"
                    type="button"
                    className="mr-4 inline-block rounded-l-xl rounded-t-xl border-2 border-webriq-darkblue bg-webriq-darkblue px-4 py-2 transition duration-500 hover:border-webriq-blue hover:bg-webriq-blue"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {acceptButtonLabel}
                  </button>
                )}
                {declineButtonLabel && (
                  <button
                    aria-label="Deny Cookies button"
                    type="button"
                    className="m-2 inline-block rounded-r-xl rounded-t-xl border-2 border-gray-400 px-4 py-2 transition duration-500 hover:bg-gray-700"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {declineButtonLabel}
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
