import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Text, Button } from "components/ui";

function VariantB({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(false);

  React.useEffect(() => {
    setShowCookie(!cookie);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 mt-4">
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
                    onMissingComponent={false} // Disabling warnings / handling unknown types
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
export default React.memo(VariantB);
