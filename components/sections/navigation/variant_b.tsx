import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { logoLink } from "helper";
import { NavigationProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";

// chakra-ui components
import {
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

function VariantB({
  /*template , */ links,
  primaryButton,
  secondaryButton,
  logo,
}: NavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = useRef();

  return (
    <section>
      <nav className="relative py-6">
        <Container
          maxW={["640px", "768px", "1024px", "1280px", "1536px"]}
          bg="white"
          mx="auto"
        >
          <Flex>
            {logo?.image && (
              <Link
                aria-label={`Go to ${
                  logoLink(logo) === "/" ? "home page" : logoLink(logo)
                }`}
                className="text-3xl font-bold leading-none"
                href={logoLink(logo)}
              >
                <Image
                  src={urlFor(logo?.image)}
                  width={48}
                  height={48}
                  alt={logo?.alt ?? "navigation-logo"}
                />
              </Link>
            )}
            <Spacer />
            <ul className="absolute hidden transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 lg:mx-auto lg:flex lg:w-auto lg:items-center lg:space-x-6">
              {links &&
                links?.map((link, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <ConditionalLink
                        variant="link"
                        ariaLabel={link?.label}
                        link={link}
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {link?.label}
                      </ConditionalLink>
                    </li>
                    {links.length !== index + 1 ? (
                      <li className="text-gray-500">
                        <svg
                          className="w-4 h-4 current-fill"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </li>
                    ) : null}
                  </React.Fragment>
                ))}
            </ul>
            <Spacer />
            <div className="lg:hidden">
              <Button
                aria-label="Navigation Menu"
                leftIcon={
                  <svg
                    className="block w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                }
                className="text-brand-primary"
                variant="none"
                ref={menuRef}
                onClick={onOpen}
              />
            </div>
            <ButtonGroup gap="2">
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className="hidden lg:inline-block text-sm font-bold text-gray-900 transition duration-200 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  ariaLabel={secondaryButton?.label}
                  link={secondaryButton}
                  className="hidden lg:inline-block text-sm font-bold text-white transition duration-200 bg-brand-primary hover:bg-brand-primary-foreground rounded-l-xl rounded-t-xl"
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </ButtonGroup>
          </Flex>
        </Container>
      </nav>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={menuRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            <ul>
              {links &&
                links?.map((link, index) => (
                  <li className="mb-1" key={index}>
                    <ConditionalLink
                      variant="link"
                      ariaLabel={link?.label}
                      link={link}
                      className="block p-4 text-sm font-semibold text-gray-700 rounded hover:bg-brand-secondary-foreground hover:text-brand-primary"
                    >
                      {link?.label}
                    </ConditionalLink>
                  </li>
                ))}
            </ul>
          </DrawerBody>

          <Stack spacing={2}>
            <ButtonGroup gap="2" pt="24px" mx="auto">
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className="block px-4 py-3 text-xs font-semibold leading-loose text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  ariaLabel={secondaryButton?.label}
                  link={secondaryButton}
                  className="block px-4 py-3 text-xs font-semibold leading-loose text-center text-white bg-brand-primary hover:bg-brand-primary-foreground rounded-l-xl rounded-t-xl"
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </ButtonGroup>
            <p className="my-4 text-xs text-center text-gray-900">
              <span>{`© ${new Date().getFullYear()} All rights reserved.`}</span>
            </p>
          </Stack>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

export default React.memo(VariantB);
