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
  Container,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

function VariantA({
  logo,
  text,
  contacts,
  copyright,
  socialMedia,
}: FooterProps) {
  return (
    <section className="bg-gray-50">
      <Container
        maxW={["640px", "768px", "1024px", "1280px", "1536px"]}
        px={4}
        py="80px"
        mx="auto"
      >
        <Flex flexWrap="wrap">
          <Box w={{ lg: "20%" }}>
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
          <Box w={{ lg: "30%" }}>
            <Text className="text-gray-500 leading-loose" w={{ xl: "65%" }}>
              {text}
            </Text>
          </Box>
          {contacts && (
            <Box className="hidden sm:block">
              <SimpleGrid
                columns={{ lg: 2, xl: 3 }}
                spacing="64px"
                alignItems="center"
              >
                <Text fontWeight="bold" mb="16px">
                  Addresses
                </Text>
                <Text fontWeight="bold" mb="16px">
                  Emails
                </Text>
                <Text fontWeight="bold" mb="16px">
                  Numbers
                </Text>
              </SimpleGrid>
              {contacts?.map((contact) => (
                <SimpleGrid
                  columns={{ lg: 2, xl: 3 }}
                  spacing="64px"
                  alignItems="center"
                  key={contact?._key}
                >
                  <Text className="text-gray-500" mb="20px">
                    {contact?.addressInfo}
                  </Text>
                  <Text className="text-gray-500" mb="20px">
                    {contact?.emailInfo}
                  </Text>
                  <Text className="text-gray-500" mb="20px">
                    {contact?.contactInfo}
                  </Text>
                </SimpleGrid>
              ))}
            </Box>
          )}
        </Flex>
        <Flex flexWrap="wrap" pt={["20px", "40px", "80px"]}>
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
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
