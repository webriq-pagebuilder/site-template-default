import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";
import { FooterProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Text } from "components/ui/Text";
import { Button } from "components/ui/Button";

function VariantC({ logo, menu, copyright, socialMedia }: FooterProps) {
  return (
    <section className="bg-gray-50">
      <BorderStyle />
      <Container>
        <div className="pt-10 pb-12">
          <Flex
            justify="between"
            align="center"
            className="relative flex-col gap-8 mb-8 md:flex-row lg:border-b lg:border-gray-300 lg:pb-8"
          >
            <Text className="w-full text-sm text-center">{copyright}</Text>
            {menu && (
              <div className="mx-auto">
                <Flex
                  className="flex-col gap-0 lg:flex-row lg:gap-10"
                  as="ul"
                  align="center"
                  justify="center"
                >
                  {menu?.map((links, index) => (
                    <li className="w-full text-center" key={index}>
                      <Button
                        asLink
                        variant="link"
                        link={links}
                        className="text-sm text-center text-black hover:text-gray-500 whitespace-nowrap"
                        ariaLabel={links?.label}
                      >
                        {links?.label}
                      </Button>
                    </li>
                  ))}
                </Flex>
              </div>
            )}
            <div className="w-full text-center ">
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
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "footer-logo"}
                    height={64}
                    width={64}
                    quality={100}
                  />
                </Link>
              )}
            </div>
          </Flex>
          {socialMedia && (
            <Flex wrap justify="center" className="space-y-2 sm:space-y-0">
              {socialMedia?.map(
                (social) =>
                  social?.socialMediaLink && (
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
                          src={urlFor(social?.socialMediaIcon?.image)}
                          width={24}
                          height={24}
                          alt={
                            social?.socialMediaIcon?.alt ??
                            "footer-socialMedia-icon"
                          }
                        />
                      ) : (
                        <SocialIcon social={social?.socialMedia as Socials} />
                      )}
                    </a>
                  )
              )}
            </Flex>
          )}
        </div>
      </Container>
    </section>
  );
}
export default React.memo(VariantC);

function BorderStyle() {
  return (
    <div className="flex w-full">
      <div className="flex w-1/3">
        <div className="w-1/3 py-1 bg-secondary" />
        <div className="w-1/3 py-1 bg-primary-foreground" />
        <div className="w-1/3 py-1 bg-primary" />
      </div>
      <div className="flex w-1/3">
        <div className="w-1/3 py-1 bg-secondary" />
        <div className="w-1/3 py-1 bg-primary-foreground" />
        <div className="w-1/3 py-1 bg-primary" />
      </div>
      <div className="flex w-1/3">
        <div className="w-1/3 py-1 bg-secondary" />
        <div className="w-1/3 py-1 bg-primary-foreground" />
        <div className="w-1/3 py-1 bg-primary" />
      </div>
    </div>
  );
}
