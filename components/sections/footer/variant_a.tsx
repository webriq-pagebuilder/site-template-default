import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";
import { FooterProps } from ".";
import { Socials } from "components/ui/SocialIcons/SocialIcons";
import { Container, Flex } from "components/layout/index";
import { Text, SocialIcon } from "components/ui";

function VariantA({
  logo,
  text,
  contacts,
  copyright,
  socialMedia,
}: FooterProps) {
  return (
    <section className="py-20 bg-background">
      <Container>
        <Flex wrap className="mb-5 lg:mb-20">
          <div className="w-full mb-5 lg:w-1/5">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="text-3xl font-bold leading-none"
                href={logoLink(logo)}
                target={logo?.linkTarget}
                rel={logo?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
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
          </div>
          <div className="w-full mb-5 lg:w-1/5">
            {Text && (
              <Text muted className="leading-loose">
                {text}
              </Text>
            )}
          </div>
          {contacts && (
            <div className="w-full mt-1 ml-auto lg:w-1/2">
              {contacts?.map((contact) => (
                <div
                  className="grid grid-cols-1 gap-4 lg:gap-10 md:grid-cols-3"
                  key={contact?._key}
                >
                  <div>
                    <Text weight="bold" className="mb-4">
                      Address
                    </Text>
                    <Text muted className="mb-5">
                      {contact?.addressInfo}
                    </Text>
                  </div>
                  <div>
                    <Text weight="bold" className="mb-4 ">
                      Email
                    </Text>
                    <Text muted className="mb-5">
                      {contact?.emailInfo}
                    </Text>
                  </div>
                  <div>
                    <Text weight="bold" className="mb-4 ">
                      Number
                    </Text>
                    <Text muted className="mb-5">
                      {contact?.contactInfo}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Flex>
        <Flex justify="between" align="center" className="w-full mx-auto lg:flex text-primary">
          {copyright && (
            <Text muted className="text-sm">
              {copyright}
            </Text>
          )}
          {socialMedia && (
            <Flex wrap className="space-x-2 lg:mx-10 lg:space-x-4">
              {socialMedia?.map(
                (social, index) =>
                  social?.socialMediaLink && (
                    <a
                      aria-label={
                        social?.socialMedia || social?.socialMediaPlatform || `socials-icon-${index + 1}`
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
                  )
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
