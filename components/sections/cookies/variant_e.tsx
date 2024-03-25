import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Flex, Container } from "components/layout/index";
import { Button, Text } from "components/ui";

function VariantE({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie ? (
        <Container maxWidth={576}>
          <Flex
            align="center"
            direction="col"
            className="p-6 mb-6 bg-gray-800 rounded-lg "
          >
            {(title || block) && (
              <div className="w-full px-4 text-center">
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
            <div className="flex w-full text-center text-gray-500 border-t border-gray-700">
              {denyCookieBtn && (
                <Button
                  as="button"
                  variant="unstyled"
                  ariaLabel={denyCookieBtn}
                  type="button"
                  className="inline-block w-1/2 py-4 text-sm font-bold transition duration-200 border-r border-gray-700 rounded-bl-lg hover:bg-gray-700"
                  onClick={() => {
                    setCookie("dismiss");
                    setShowCookie(!showCookie);
                  }}
                >
                  {denyCookieBtn}
                </Button>
              )}
              {allowCookieBtn && (
                <Button
                  as="button"
                  variant="unstyled"
                  ariaLabel={allowCookieBtn}
                  type="button"
                  className="inline-block w-1/2 py-4 text-sm font-bold transition duration-200 border-r border-gray-700 rounded-bl-lg hover:bg-gray-700"
                  onClick={() => {
                    setCookie("allow");
                    setShowCookie(!showCookie);
                  }}
                >
                  {allowCookieBtn}
                </Button>
              )}
            </div>
          </Flex>
        </Container>
      ) : null}
    </div>
  );
}
export default React.memo(VariantE);
