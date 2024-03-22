import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";

import { PortableTextComponents } from "@portabletext/react";
import { CookiesProps } from ".";
import { Button, Text } from "components/ui";
import { Flex, Container } from "components/layout/index";

// block styling as props to `components` of the PortableText component
export const cookiesBlockStyling: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      return (
        <Text muted className="my-5 text-sm ">
          {children}
        </Text>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        aria-label={value.href ?? "external link"}
        className="text-blue-400 hover:text-secondary-foreground"
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
        <Container>
          <Flex align="center" wrap className="p-6 mb-6 bg-gray-800 rounded-lg">
            {(title || block) && (
              <div className="w-full px-4 lg:w-2/3">
                <Text weight="bold" className="text-white">
                  {title}
                </Text>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
              </div>
            )}
            <div className="px-4 lg:w-1/3 lg:text-right">
              {allowCookieBtn && (
                <Button
                  as="button"
                  ariaLabel={allowCookieBtn}
                  type="button"
                  className="m-2 "
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
                  as="button"
                  ariaLabel={denyCookieBtn}
                  variant="outline"
                  type="button"
                  className="m-2 font-normal text-white bg-transparent outline-gray-400 hover:bg-gray-700"
                  onClick={() => {
                    setCookie("dismiss");
                    setShowCookie(!showCookie);
                  }}
                >
                  {denyCookieBtn}
                </Button>
              )}
            </div>
          </Flex>
        </Container>
      ) : null}
    </div>
  );
}
export default React.memo(VariantA);
