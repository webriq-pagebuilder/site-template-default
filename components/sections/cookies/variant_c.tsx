import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Button } from "components/ui/Button";

function VariantC({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie
        ? title && (
            <div className="max-w-md p-6 px-10 mx-4 mb-6 text-white bg-gray-800 rounded-lg md:mx-0 md:ml-10">
              <div className="text-center">
                <p className="font-bold font-heading">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
                {allowCookieBtn && (
                  <Button
                    ariaLabel={allowCookieBtn}
                    type="button"
                    className="mr-4 border-2 border-webriq-darkblue bg-webriq-darkblue hover:border-webriq-blue hover:bg-webriq-blue"
                    onClick={() => {
                      setCookie("allow");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {allowCookieBtn}
                  </Button>
                )}
                {denyCookieBtn && (
                  <Button
                    ariaLabel={denyCookieBtn}
                    type="button"
                    variant="outline"
                    className="m-2 text-white bg-transparent border-2 border-gray-400 rounded -bl-none rounded-r-xl rounded-t-xl hover:bg-gray-700"
                    onClick={() => {
                      setCookie("dismiss");
                      setShowCookie(!showCookie);
                    }}
                  >
                    {denyCookieBtn}
                  </Button>
                )}
              </div>
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantC);
