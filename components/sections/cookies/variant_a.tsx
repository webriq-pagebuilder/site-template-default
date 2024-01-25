import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";

import { PortableTextComponents } from "@portabletext/react";
import { CookiesProps } from ".";
import { Button } from "components/ui/Button";

// block styling as props to `components` of the PortableText component
export const cookiesBlockStyling: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      return <p className="my-5 text-sm text-gray-500">{children}</p>;
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        aria-label={value.href ?? "external link"}
        className="text-blue-400 hover:text-brand-secondary-foreground"
        target="_blank"
        href={value.href}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function VariantA({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState<boolean>(!!cookie);

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie ? (
        <div className="container px-4 mx-auto">
          {(title || block) && (
            <div className="flex flex-wrap items-center p-6 mb-6 text-white bg-gray-800 rounded-lg">
              <div className="w-full px-4 lg:w-2/3">
                <p className="font-bold font-heading">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
              </div>
              <div className="px-4 lg:w-1/3 lg:text-right">
                {allowCookieBtn && (
                  <Button
                    ariaLabel={allowCookieBtn}
                    type="button"
                    className="py-2 m-2 border-2 border-brand-primary hover:border-brand-primary-foreground"
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
                    variant="outline"
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
          )}
        </div>
      ) : null}
    </div>
  );
}
export default React.memo(VariantA);
