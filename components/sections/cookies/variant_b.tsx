import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Button } from "components/ui/Button";

function VariantB({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {!showCookie
        ? title && (
            <div className="py-6 text-white bg-gray-800">
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap items-center -mx-4">
                  <div className="w-full px-4 lg:w-3/4">
                    <p className="font-bold font-heading">{title}</p>
                    {block && (
                      <PortableText
                        value={block}
                        components={cookiesBlockStyling}
                      />
                    )}
                  </div>
                  <div className="w-full px-4 lg:w-1/4 lg:text-right">
                    {allowCookieBtn && (
                      <Button
                        ariaLabel={allowCookieBtn}
                        type="button"
                        className="m-2 border-2 rounded-l-xl rounded-t-xl border-brand-primary bg-brand-primary hover:border-brand-primary-foreground"
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
                        className="m-2 font-normal text-white bg-transparent border-2 border-gray-400 rounded-bl-none rounded-r-xl rounded-t-xl hover:bg-gray-700"
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
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantB);
