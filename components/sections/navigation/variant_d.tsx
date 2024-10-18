import React from "react";
import { Button } from "@stackshift-ui/button";
import { Text } from "@stackshift-ui/text";
import { Link } from "@stackshift-ui/link";
import { Image } from "@stackshift-ui/image";
import { Section } from "@stackshift-ui/section";
import { Container } from "@stackshift-ui/container";
import { Flex } from "@stackshift-ui/flex";
import { LabeledRoute, LabeledRouteWithKey, Logo } from "../../../types";
import { NavigationProps, ResponsiveNavLinksProps } from ".";
import { logoLink } from "../../../helper";

export default function Navigation_D({
  links,
  primaryButton,
  secondaryButton,
  logo,
}: NavigationProps) {
  const [menu, setMenu] = React.useState(false);
  const showMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <Section className="bg-background">
      <nav className="relative px-6 py-6">
        <Container maxWidth={1000}>
          <Flex align="center">
            <NavLinks links={links} />
            <LogoSection logo={logo} />
            <Buttons
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
            />
            <MobileMenu showMenu={showMenu} />
          </Flex>
        </Container>
      </nav>
      <ResponsiveNavLinks
        menu={menu}
        showMenu={showMenu}
        links={links}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </Section>
  );
}

function NavLinks({ links }: { links?: LabeledRouteWithKey[] }) {
  if (!links) return null;

  return (
    <ul className="hidden lg:flex lg:w-auto lg:items-center lg:space-x-5">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {link?.label && <NavItem link={link} />}
          {links.length !== index + 1 && <NavIcon />}
        </React.Fragment>
      ))}
    </ul>
  );
}

function NavItem({ link }: { link?: LabeledRouteWithKey }) {
  if (!link) return null;

  return (
    <li>
      <Button
        as="link"
        ariaLabel={link?.label}
        link={link}
        className="text-sm text-gray-500 no-underline hover:text-gray-900"
      >
        {link?.label}
      </Button>
    </li>
  );
}

function NavIcon() {
  return (
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
  );
}

function LogoSection({ logo }: { logo?: Logo }) {
  if (!logo) return null;

  return (
    <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform">
      <Link
        aria-label={`Go to ${
          logoLink(logo) === "/" ? "home page" : logoLink(logo)
        }`}
        className="text-3xl font-bold leading-none"
        href={logoLink(logo)}
        target={logo?.linkTarget}
        rel={logo?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
      >
        <Image
          src={logo?.image}
          alt={logo?.alt ?? "navigation-logo"}
          width={100}
          height={100}
          className="text-3xl font-bold leading-none"
        />
      </Link>
    </div>
  );
}

function Buttons({
  primaryButton,
  secondaryButton,
}: {
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
}) {
  return (
    <React.Fragment>
      {primaryButton?.label && (
        <Button
          as="link"
          ariaLabel={primaryButton?.label}
          link={primaryButton}
          className="hidden lg:inline-block px-4 py-3 mb-2 text-gray-900 lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-l-xl rounded-t-xl"
        >
          {primaryButton?.label}
        </Button>
      )}
      {secondaryButton?.label && (
        <Button
          as="link"
          ariaLabel={secondaryButton?.label}
          link={secondaryButton}
          className="hidden lg:inline-block px-4 py-3 mb-2 leading-loose text-center text-white font-semibold bg-primary hover:bg-primary-foreground rounded-l-xl rounded-t-xl"
        >
          {secondaryButton?.label}
        </Button>
      )}
    </React.Fragment>
  );
}

function MobileMenu({ showMenu }: { showMenu: () => void }) {
  return (
    <div className="ml-auto lg:hidden">
      <Button
        variant="unstyled"
        as="button"
        ariaLabel="Navigation menu"
        className="flex items-center p-3 navbar-burger text-primary"
        onClick={showMenu}
      >
        <svg
          className="block w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </Button>
    </div>
  );
}

function ResponsiveNavLinks({
  menu,
  showMenu,
  links,
  primaryButton,
  secondaryButton,
}: ResponsiveNavLinksProps) {
  return (
    <div className={`${menu ? null : "hidden"} mobile-nav relative z-50`}>
      <div
        className="fixed inset-0 bg-gray-800 opacity-25 navbar-backdrop"
        onClick={showMenu}
      ></div>
      <nav className="fixed top-0 bottom-0 left-0 flex flex-col w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-white border-r">
        <div className="flex items-center mb-8">
          <Button
            variant="unstyled"
            as="button"
            ariaLabel="Navigation menu"
            className="navbar-close"
            onClick={showMenu}
          >
            <svg
              className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Button>
        </div>
        <div>
          <ul>
            {links &&
              links?.map((link, index) => (
                <li className="mb-1" key={index}>
                  <Button
                    as="link"
                    ariaLabel={link?.label}
                    link={link}
                    className="block p-4 text-sm font-semibold text-gray-700 no-underline rounded hover:bg-secondary-foreground hover:text-primary"
                  >
                    {link?.label}
                  </Button>
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            {primaryButton?.label && (
              <Button
                as="link"
                ariaLabel={primaryButton?.label}
                link={primaryButton}
                className="block px-4 py-3 mb-2 text-gray-900 text-center lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-l-xl rounded-t-xl"
              >
                {primaryButton?.label}
              </Button>
            )}
            {secondaryButton?.label && (
              <Button
                as="link"
                ariaLabel={secondaryButton?.label}
                link={secondaryButton}
                className="block px-4 py-3 mb-2 leading-loose text-center text-white font-semibold bg-primary hover:bg-primary-foreground rounded-l-xl rounded-t-xl"
              >
                {secondaryButton?.label}
              </Button>
            )}
          </div>
          <Text fontSize="xs" muted className="my-4 text-center ">
            <span>{`© ${new Date().getFullYear()} All rights reserved.`}</span>
          </Text>
        </div>
      </nav>
    </div>
  );
}

export { Navigation_D };
