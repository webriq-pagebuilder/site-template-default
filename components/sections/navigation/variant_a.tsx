import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { logoLink } from "helper";
import { NavigationProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";

function VariantA({
  template,
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
    <section>
      <nav className="relative flex items-center justify-between px-6 py-6 bg-white">
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
        <div className="lg:hidden">
          <button
            aria-label="Navigation Menu"
            className="flex items-center p-3 navbar-burger text-brand-primary"
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
          </button>
        </div>
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
        {primaryButton?.label && (
          <ConditionalLink
            ariaLabel={primaryButton?.label}
            link={primaryButton}
            className="hidden px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
          >
            {primaryButton?.label}
          </ConditionalLink>
        )}
        {secondaryButton?.label && (
          <ConditionalLink
            ariaLabel={secondaryButton?.label}
            link={secondaryButton}
            className={`hidden lg:inline-block py-2 px-6 bg-${template.color}-darkblue hover:bg-${template.color}-blue text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200`}
          >
            {secondaryButton?.label}
          </ConditionalLink>
        )}
      </nav>
      <div className={`${menu ? null : "hidden"} navbar-menu relative z-50`}>
        <div
          className="fixed inset-0 bg-gray-800 opacity-25 navbar-backdrop"
          onClick={showMenu}
        />
        <nav className="fixed top-0 bottom-0 left-0 flex flex-col w-5/6 max-w-sm px-6 py-6 overflow-y-auto bg-white border-r">
          <div className="flex items-center mb-8">
            <button
              aria-label="Navigation Menu"
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
            </button>
          </div>
          <div>
            {links && (
              <ul>
                {links?.map((link, index) => (
                  <li className="mb-1" key={index}>
                    <ConditionalLink
                      variant="link"
                      ariaLabel={link?.label}
                      className="block p-4 text-sm font-semibold text-gray-900 rounded hover:bg-brand-secondary-foreground hover:text-brand-primary"
                      link={link}
                    >
                      {link?.label}
                    </ConditionalLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className="block px-4 py-3 mb-3 text-xs font-semibold leading-loose text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  ariaLabel={secondaryButton?.label}
                  link={secondaryButton}
                  className={`block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-${template.color}-darkblue hover:bg-${template.color}-blue rounded-l-xl rounded-t-xl`}
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </div>
            <p className="my-4 text-xs text-center text-gray-900">
              <span>{`© ${new Date().getFullYear()} All rights reserved.`}</span>
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
