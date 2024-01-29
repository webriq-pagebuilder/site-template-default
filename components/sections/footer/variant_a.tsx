import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { logoLink } from "helper";

import { FooterProps } from ".";
import { SocialIcon } from "components/ui/SocialIcons";
import { Socials } from "components/ui/SocialIcons/SocialIcons";

// chakra-ui components
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

function VariantA({
  logo,
  text,
  contacts,
  copyright,
  socialMedia,
}: FooterProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <Flex className="mb-5 lg:mb-20">
            <Box mb="20px">
              {logo?.image && (
                <Link
                  aria-label={
                    logoLink(logo) === "/"
                      ? "Go to home page"
                      : `Go to ${logoLink(logo)}`
                  }
                  className="text-3xl font-bold leading-none"
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
            </Box>
            <Spacer />
            <Box w="20%">
              <Text className="text-gray-500 leading-loose">{text}</Text>
            </Box>
            <Spacer />
            <Box>
              {contacts && (
                <div className="hidden sm:block">
                  {contacts?.length > 1 ? (
                    <Wrap spacing={20}>
                      <WrapItem>
                        <p className="mb-4 font-bold">Addresses</p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-4 font-bold">Emails</p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-4 font-bold">Numbers</p>
                      </WrapItem>
                    </Wrap>
                  ) : (
                    <Wrap spacing={20}>
                      <WrapItem>
                        <p className="mb-4 font-bold">Address</p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-4 font-bold">Email</p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-4 font-bold">Number</p>
                      </WrapItem>
                    </Wrap>
                  )}
                  {contacts?.map((contact) => (
                    <Wrap spacing={20} key={contact?._key}>
                      <WrapItem>
                        <p className="mb-5 text-gray-500">
                          {contact?.addressInfo}
                        </p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-5 text-gray-500">
                          {contact?.emailInfo}
                        </p>
                      </WrapItem>
                      <WrapItem>
                        <p className="mb-5 text-gray-500">
                          {contact?.contactInfo}
                        </p>
                      </WrapItem>
                    </Wrap>
                  ))}
                </div>
              )}
            </Box>
          </Flex>
          <Flex>
            <Text size="sm" color="GrayText">
              {copyright}
            </Text>
            <Spacer />
            {socialMedia && (
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing="12px"
                mx={{ lg: "65px" }}
              >
                {socialMedia?.map(
                  (social) =>
                    social?.socialMediaLink && (
                      <Link
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
                      </Link>
                    )
                )}
              </Stack>
            )}
          </Flex>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
