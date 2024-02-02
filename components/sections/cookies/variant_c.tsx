import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";
import { Button } from "components/ui/Button";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Text } from "components/ui/Text";

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
      {!showCookie ? (
        <Container maxWidth={576}>
          <Flex
            align="center"
            direction="col"
            wrap
            className="p-6 mb-6 bg-gray-800"
          >
            {(title || block) && (
              <div className="w-full px-4 ">
                <Text weight="bold" muted>
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
            <div>
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
          </Flex>
        </Container>
      ) : null}
    </div>
  );
}
export default React.memo(VariantC);
