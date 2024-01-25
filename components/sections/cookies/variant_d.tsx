import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Button } from "components/ui/Button";

function VariantD({
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
            <div className="max-w-md py-6 pl-6 pr-16 mx-4 mb-6 text-white bg-gray-800 rounded-lg md:mx-0 md:ml-10 lg:max-w-3xl">
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 lg:w-2/3">
                  <p className="font-bold font-heading">{title}</p>
                  {block && (
                    <PortableText
                      value={block}
                      components={cookiesBlockStyling}
                    />
                  )}
                </div>
                <div className="w-full px-4 lg:w-1/3 lg:text-right">
                  {allowCookieBtn && (
                    <Button
                      ariaLabel={allowCookieBtn}
                      type="button"
                      className="mr-4 border-2 border-brand-primary bg-brand-primary hover:border-brand-primary-foreground hover:bg-brand-primary-foreground"
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
                      variant="outline"
                      ariaLabel={denyCookieBtn}
                      type="button"
                      className="m-2 text-white bg-transparent border-2 border-gray-400 rounded-bl-none rounded-r-xl rounded-t-xl hover:bg-gray-700"
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
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantD);
