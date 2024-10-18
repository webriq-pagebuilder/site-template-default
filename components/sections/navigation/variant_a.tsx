import { Button } from "@stackshift-ui/button";
import { Flex } from "@stackshift-ui/flex";
import { Image } from "@stackshift-ui/image";
import { Link } from "@stackshift-ui/link";
import { Section } from "@stackshift-ui/section";
import { Text } from "@stackshift-ui/text";
import React from "react";
import { NavigationProps, ResponsiveNavLinksProps } from ".";
import { logoLink } from "../../../helper";
import { LabeledRoute, LabeledRouteWithKey, Logo } from "../../../types";

export default function Navigation_A({
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
      <Flex align="center" justify="between" className="px-6 py-6">
        <LogoSection logo={logo} />
        <NavLinks links={links} />
        <Buttons
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
        />
        <MobileMenu showMenu={showMenu} />
      </Flex>
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

function LogoSection({ logo }: { logo?: Logo }) {
  if (!logo) return null;

  return (
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
        width={50}
        height={50}
        className="text-3xl font-bold leading-none"
      />
    </Link>
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

function NavLinks({ links }: { links?: LabeledRouteWithKey[] }) {
  if (!links) return null;

  return (
    <Flex>
      <ul className="hidden lg:flex lg:items-center lg:space-x-6">
        {links?.map((link: any, index: number) => (
          <React.Fragment key={index}>
            <NavItem link={link} key={link._key} />
            {links.length !== index + 1 ? <NavIcon /> : null}
          </React.Fragment>
        ))}
      </ul>
    </Flex>
  );
}

function NavItem({ link }: { link?: LabeledRoute }) {
  if (!link?.label) return null;

  return (
    <li>
      <Button
        as="link"
        link={link}
        ariaLabel={link?.label}
        className="text-sm text-gray-500 no-underline hover:text-gray-900"
      >
        {link?.label}
      </Button>
    </li>
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
      />
      <Flex
        as="nav"
        direction="col"
        className="fixed top-0 bottom-0 left-0 w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-white border-r"
      >
        <BurgerMenuIcon showMenu={showMenu} />
        <div className="w-full">
          {links ? (
            <ul>
              {links?.map((link: any, index: number) => (
                <li className="mb-1" key={index}>
                  <Button
                    as="link"
                    ariaLabel={link?.label}
                    className="block w-full cursor-pointer p-4 text-sm font-semibold text-gray-900 no-underline rounded hover:bg-secondary-foreground hover:text-primary"
                    link={link}
                  >
                    {link?.label}
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="w-full mt-auto">
          <Flex direction="col" className="pt-6 space-x-2">
            {primaryButton?.label ? (
              <Button
                as="link"
                link={primaryButton}
                ariaLabel={primaryButton?.label}
                variant="outline"
                className="block w-full px-4 py-3 mb-3 text-xs cursor-pointer font-semibold leading-loose text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
              >
                {primaryButton?.label}
              </Button>
            ) : null}
            {secondaryButton?.label ? (
              <Button
                as="link"
                link={secondaryButton}
                ariaLabel={secondaryButton?.label}
                variant="solid"
                className={`block w-full px-4 py-3 mb-2 cursor-pointer leading-loose text-xs text-center font-semibold bg-primary hover:bg-primary-foreground rounded-l-xl rounded-t-xl`}
              >
                {secondaryButton?.label}
              </Button>
            ) : null}
          </Flex>
          <Text fontSize="xs" className="my-4 text-center text-gray-900">
            <span>{`© ${new Date().getFullYear()} All rights reserved.`}</span>
          </Text>
        </div>
      </Flex>
    </div>
  );
}

function MobileMenu({ showMenu }: { showMenu: () => void }) {
  return (
    <div className="lg:hidden">
      <Button
        variant="unstyled"
        as="button"
        ariaLabel="Navigation Menu"
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

function Buttons({
  primaryButton,
  secondaryButton,
}: {
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
}) {
  return (
    <Flex gap={4}>
      {primaryButton?.label ? (
        <Button
          as="link"
          link={primaryButton}
          ariaLabel={primaryButton?.label}
          variant="outline"
          className="hidden lg:flex px-4 py-3 mb-2 leading-loose text-center font-semibold text-gray-900 bg-secondary hover:bg-secondary/50 rounded-l-xl rounded-t-xl"
        >
          {primaryButton?.label}
        </Button>
      ) : null}
      {secondaryButton?.label ? (
        <Button
          as="link"
          link={secondaryButton}
          ariaLabel={secondaryButton?.label}
          variant="solid"
          className="hidden lg:flex px-4 py-3 mb-2 leading-loose text-center font-semibold text-white bg-primary hover:bg-primary-foreground rounded-l-xl rounded-t-xl"
        >
          {secondaryButton?.label}
        </Button>
      ) : null}
    </Flex>
  );
}

function BurgerMenuIcon({ showMenu }: { showMenu: () => void }) {
  return (
    <div className="flex items-center mb-8">
      <Button
        variant="unstyled"
        as="button"
        ariaLabel="Navigation Menu"
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
  );
}

export { Navigation_A };
