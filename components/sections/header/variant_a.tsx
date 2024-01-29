import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

import { HeaderProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";

// chakra-ui components
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

function VariantA({
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <section>
      <Container
        maxW={["640px", "768px", "1024px", "1280px", "1536px"]}
        bg="white"
        px={4}
        py={["48px", "80px"]}
        mx="auto"
        centerContent
      >
        <SimpleGrid columns={{ lg: 2 }} spacing="64px" alignItems="center">
          <Stack
            spacing="24px"
            maxW="md"
            mx="auto"
            className="text-center lg:text-left"
          >
            {title && (
              <Heading as="h1" size="2xl">
                {title}
              </Heading>
            )}
            {description && (
              <Text fontSize="md" color="GrayText">
                {description}
              </Text>
            )}
            <Stack
              direction="row"
              flexWrap="wrap"
              className="justify-center lg:justify-normal"
              spacing="12px"
            >
              {primaryButton?.label && (
                <ConditionalLink
                  link={primaryButton}
                  ariaLabel={primaryButton?.label}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  link={secondaryButton}
                  className="text-black bg-white hover:bg-gray-50"
                  ariaLabel={secondaryButton?.label}
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center" justifyContent="center" w="100%" px={16}>
            {mainImage && (
              <Box position="relative">
                <Box position="relative" zIndex={2}>
                  {mainImage?.image && (
                    <Image
                      className="overflow-hidden rounded-3xl object-cover md:rounded-br-none lg:h-[448px]"
                      src={urlFor(mainImage?.image)}
                      sizes="(min-width: 520px) 448px, 90vw"
                      width={448}
                      height={448}
                      alt={mainImage?.alt ?? "header-main-image"}
                      priority={true}
                    />
                  )}
                </Box>
                <Box
                  className="hidden lg:block lg:top-[-2rem] lg:right-[3rem]"
                  position="absolute"
                  zIndex={1}
                >
                  <Image
                    src="/assets/elements/webriq-blue-dark-up.png"
                    width={112}
                    height={112}
                    alt="webriq-blue-dark-up-mainImage-element"
                  />
                </Box>
                <Box
                  className="hidden lg:block lg:bottom-[-2rem] lg:right-[-2rem]"
                  position="absolute"
                  zIndex={1}
                >
                  <Image
                    src="/assets/elements/wing-webriq-blue-down.png"
                    width={144}
                    height={144}
                    alt="wing-webriq-blue-down-mainImage-element"
                  />
                </Box>
                <Box
                  className="hidden lg:block lg:top-[3rem] lg:right-[-3rem]"
                  position="absolute"
                  zIndex={1}
                >
                  <Image
                    src="/assets/elements/bullets-gray-right.svg"
                    width={115}
                    height={157}
                    alt="bullets-gray-right-mainImage-element"
                  />
                </Box>
                <Box
                  className="hidden lg:block lg:bottom-[2.5rem] lg:left-[-4.5rem]"
                  position="absolute"
                  zIndex={1}
                >
                  <Image
                    src="/assets/elements/bullets-gray-left.svg"
                    width={157}
                    height={115}
                    alt="bullets-gray-left-mainImage-element"
                  />
                </Box>
              </Box>
            )}
          </Stack>
        </SimpleGrid>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
