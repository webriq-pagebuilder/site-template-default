import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";
import { FooterProps } from ".";
import { Socials } from "components/ui/SocialIcons/SocialIcons";
import { Container, Flex } from "components/layout/index";
import { Text, SocialIcon, Button } from "components/ui";

function VariantD({
  logo,
  multipleMenus,
  copyright,
  socialMedia,
  text,
}: FooterProps) {
  return (
    <section className="py-20 overflow-hidden bg-gray-50">
      <Container>
        <Flex wrap className="space-y-4 lg:space-y-0">
          {(logo?.image || text) && (
            <div className="w-full max-w-2xl space-y-4 lg:w-1/4">
              {logo?.image && (
                <Link
                  className="inline-block text-xl font-bold leading-none"
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  href={logoLink(logo)}
                >
                  <Image
                    className="h-14"
                    src={urlFor(logo?.image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={132}
                    height={56}
                    alt={logo?.alt ?? "footer-logo"}
                  />
                </Link>
              )}
              {text && (
                <Text muted className="leading-normal ">
                  {text}
                </Text>
              )}
            </div>
          )}

          {multipleMenus?.length > 0 && (
            <Flex wrap className="flex-grow lg:justify-around" gap={4}>
              {multipleMenus?.map((menu) => (
                <div key={menu?._key} className="w-[200px] flex-none">
                  {menu?.title && (
                    <Text weight="bold" className="mb-3">
                      {menu?.title}
                    </Text>
                  )}
                  {menu?.links?.length > 0 && (
                    <Flex as="ul" direction="col" className="space-y-2">
                      {menu?.links?.map((link) => (
                        <li key={link?._key}>
                          <Button
                            as="link"
                            link={link}
                            className="text-gray-500 no-underline hover:text-gray-700"
                            ariaLabel={link?.label}
                          >
                            {link?.label}
                          </Button>
                        </li>
                      ))}
                    </Flex>
                  )}
                </div>
              ))}
            </Flex>
          )}

          {socialMedia && (
            <Flex className="w-full ml-auto lg:justify-end lg:w-1/6">
              {socialMedia?.map(
                (social) =>
                  social?.socialMediaLink && (
                    <span key={social?._key}>
                      <a
                        aria-label={
                          social?.socialMedia || social?.socialMediaPlatform
                        }
                        className="inline-block p-2 mr-2 rounded bg-gray-50 hover:bg-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={social?.socialMediaLink}
                        key={social?._key}
                      >
                        {social?.socialMediaIcon?.image ? (
                          <Image
                            className="h-6"
                            src={urlFor(social?.socialMediaIcon?.image)}
                            quality={100}
                            width={24}
                            height={24}
                            alt={
                              social?.socialMediaIcon?.alt ??
                              "contact-socialMedia-icon"
                            }
                          />
                        ) : (
                          <SocialIcon social={social?.socialMedia as Socials} />
                        )}
                      </a>
                    </span>
                  )
              )}
            </Flex>
          )}
        </Flex>
        {copyright && <Text className="pt-10 text-sm">{copyright}</Text>}
      </Container>
    </section>
  );
}
export default React.memo(VariantD);
