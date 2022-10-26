import { memo, useState, Fragment, useEffect, useCallback } from "react";
import Link from "next/link";
import { urlFor, PortableText } from "lib/sanity";
import { EcwidContextProvider } from "context/EcwidContext";

function VariantE({ banner, logo, links }) {
  // block styling as props to `serializers` of the PortableText component
  const blockStyle = {
    types: {
      block: (props) => {
        const style = props.node.style || "normal";
        switch (style) {
          case "normal":
            return (
              <p className="text-xs text-white font-bold font-heading">
                {props.children}
              </p>
            );
        }

        return PortableText.defaultSerializers.types.block(props);
      },
      code: (props) => {
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>;
      },
    },
    marks: {
      strong: (props) => <strong>{props.children}</strong>,
      em: (props) => <em>{props.children}</em>,
      code: (props) => <code>{props.children}</code>,
      link: ({ children, mark }) => (
        <a
          aria-label={children ?? "external link"}
          className="hover:text-webriq-lightblue text-webriq-blue"
          href={mark.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  let logoLink;
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu((prevState) => !prevState);
  };

  if (logo.type === "linkInternal") {
    if (logo.internalLink === undefined) {
      logoLink = `/`;
    } else {
      if (logo.internalLink === "Home" || logo.internalLink === "home") {
        logoLink = `/`;
      } else {
        logoLink = `/${logo.internalLink}`;
      }
    }
  } else {
    if (logo.externalLink === undefined) {
      logoLink = `/`;
    } else {
      logoLink = logo.externalLink;
    }
  }

  return (
    <EcwidContextProvider>
      <section className="relative">
        <div className="py-2 bg-webriq-darkblue">
          <div className="flex items-center justify-center">
            <svg
              className="mr-2"
              width={18}
              height={11}
              viewBox="0 0 18 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="3.07129"
                width={4}
                height={10}
                rx={2}
                transform="rotate(-45 0 3.07129)"
                fill="white"
              />
              <rect
                x={8}
                y="2.82861"
                width={4}
                height={10}
                rx={2}
                transform="rotate(-45 8 2.82861)"
                fill="white"
              />
            </svg>
            {banner && (
              <PortableText blocks={banner} serializers={blockStyle} />
            )}
          </div>
        </div>
        <nav className="relative flex justify-between">
          <div className="px-12 py-8 flex w-full items-center">
            {logo?.image && (
              <Link href={logoLink} prefetch={false}>
                <a
                  aria-label={`Go to ${
                    logoLink === "/" ? "home page" : logoLink
                  }`}
                  className="text-3xl font-bold leading-none"
                >
                  <img
                    className="h-12"
                    src={urlFor(logo?.image)}
                    alt={logo?.alt ?? "navigation-logo"}
                  />
                </a>
              </Link>
            )}
            {/* larger screens navigation menu links */}
            <ul className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:items-center lg:w-auto">
              {links &&
                links.map((link, index) => (
                  <Fragment key={index}>
                    <li>
                      {link.type === "linkInternal" ? (
                        <Link
                          href={`${
                            link.internalLink === "Home" ||
                            link.internalLink === "home"
                              ? "/"
                              : `/${
                                  link.internalLink === undefined
                                    ? "page-not-found"
                                    : link.internalLink
                                }`
                          }`}
                        >
                          <a
                            aria-label={`Navigation ${
                              link?.label ?? "Menu"
                            } links which directs to ${
                              link?.internalLink === undefined
                                ? "page-not-found"
                                : link?.internalLink
                            }`}
                            className="xl:mr-12 lg:mr-8 font-bold font-heading hover:text-gray-600"
                            target={link?.linkTarget}
                            rel={
                              link?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {link?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Navigation ${
                            link?.label ?? "Menu"
                          } links which directs to ${
                            link?.externalLink === undefined
                              ? "link-not-found"
                              : link?.externalLink
                          }`}
                          className="mr-12 font-bold font-heading hover:text-gray-600"
                          target={link?.linkTarget}
                          href={`${
                            link.externalLink === undefined
                              ? "link-not-found"
                              : link.externalLink
                          }`}
                          rel={
                            link?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {link?.label}
                        </a>
                      )}
                    </li>
                  </Fragment>
                ))}
            </ul>
          </div>
          {/* larger screens search, cart and account icons/buttons */}
          <div className="hidden xl:flex items-center justify-end mr-12">
            <button aria-label="search button" type="button">
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
              </svg>
            </button>

            <div className="mx-10 cart-icon">
              <div data-icon="BAG" className="ec-cart-widget" />
              <a
                href="/cart?store-page=cart"
                aria-label="cart button"
                className="cart-link"
              />
            </div>

            <a href="/cart?store-page=account">
              <svg
                width={32}
                height={31}
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          {/* nav menu sidebar button on mobile view */}
          <button
            className="navbar-burger self-center mr-12 xl:hidden"
            onClick={showMenu}
          >
            <svg
              width={20}
              height={12}
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2ZM19 10H1C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10ZM19 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </nav>
        <div
          className={`${
            menu ? null : "hidden"
          } fixed top-0 right-0 bottom-0 w-5/6 max-w-sm`}
          style={{ zIndex: 60 }}
        >
          <div
            className="fixed inset-0 bg-gray-800 opacity-25"
            onClick={showMenu}
          />
          <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              {logo?.image && (
                <Link href={logoLink} prefetch={false}>
                  <a
                    aria-label={`Go to ${
                      logoLink === "/" ? "home page" : logoLink
                    }`}
                    className="text-3xl font-bold leading-none"
                  >
                    <img
                      className="h-12"
                      src={urlFor(logo?.image)}
                      alt={logo?.alt ?? "navigation-logo"}
                    />
                  </a>
                </Link>
              )}
              <button
                aria-label="Navbar Close button"
                className="ml-auto"
                onClick={showMenu}
              >
                <svg
                  className="h-2 w-2 text-gray-500 cursor-pointer"
                  width={10}
                  height={10}
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {/* mobile view navigation sidebar */}
            <ul className="my-10">
              {links &&
                links.map((link, index) => (
                  <Fragment key={index}>
                    <li className="mb-8">
                      {link.type === "linkInternal" ? (
                        <Link
                          href={`${
                            link.internalLink === "Home" ||
                            link.internalLink === "home"
                              ? "/"
                              : `/${
                                  link.internalLink === undefined
                                    ? "page-not-found"
                                    : link.internalLink
                                }`
                          }`}
                        >
                          <a
                            aria-label={`Navigation ${
                              link?.label ?? "Menu"
                            } links which directs to ${
                              link?.internalLink === undefined
                                ? "page-not-found"
                                : link?.internalLink
                            }`}
                            className="font-bold font-heading hover:text-gray-600"
                            target={link?.linkTarget}
                            rel={
                              link?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            {link?.label}
                          </a>
                        </Link>
                      ) : (
                        <a
                          aria-label={`Navigation ${
                            link?.label ?? "Menu"
                          } links which directs to ${
                            link?.externalLink === undefined
                              ? "link-not-found"
                              : link?.externalLink
                          }`}
                          className="font-bold font-heading hover:text-gray-600"
                          target={link?.linkTarget}
                          href={`${
                            link.externalLink === undefined
                              ? "link-not-found"
                              : link.externalLink
                          }`}
                          rel={
                            link?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                        >
                          {link?.label}
                        </a>
                      )}
                    </li>
                  </Fragment>
                ))}
            </ul>
            {/* mobile view search, cart and account buttons */}
            <div className="flex mb-8 mx-auto items-center">
              <button aria-label="search button" type="button">
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                </svg>
              </button>
              <div className="mx-10 cart-icon">
                <div data-icon="BAG" className="ec-cart-widget" />
                <a
                  href="/cart?store-page=cart"
                  aria-label="cart button"
                  className="cart-link"
                />
              </div>

              <a
                href="/cart?store-page=account"
                aria-label="account"
                type="button"
              >
                <svg
                  width={32}
                  height={31}
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </section>
    </EcwidContextProvider>
  );
}
export default memo(VariantE);
