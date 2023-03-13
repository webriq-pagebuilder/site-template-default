import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { logoLink, InternalLink, ExternalLink } from "helper";


function VariantA({ template, links, primaryButton, secondaryButton, logo }) {
  const [menu, setMenu] = React.useState(false);
  const showMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <section>
      <nav className="relative px-6 py-6 flex justify-between items-center bg-white">
        {logo?.image && (
          <Link href={logoLink()}>
            <a
              aria-label={`Go to ${
                logoLink() === "/" ? "home page" : logoLink()
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
        <div className="lg:hidden">
          <button
            aria-label="Navbar Menu button"
            className="navbar-burger flex items-center text-webriq-darkblue p-3"
            onClick={showMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {links &&
            links?.map((link, index) => (
              <React.Fragment key={index}>
                <li>
                  {link.type === "linkInternal" ? (
                    <InternalLink
                      className={`text-sm text-gray-500 hover:text-gray-900`}
                      link={link}
                    />
                  ) : (
                    <ExternalLink
                      className={`text-sm text-gray-500 hover:text-gray-900`}
                      link={link}
                    />
                  )}
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
        {primaryButton?.label &&
          (primaryButton?.type === "linkInternal" ? (
            <InternalLink
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-200"
              link={primaryButton}
            />
          ) : (
            <ExternalLink
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-200"
              link={primaryButton}
            />
          ))}
        {secondaryButton?.label &&
          (secondaryButton?.type === "linkInternal" ? (
            <InternalLink
              className={`hidden lg:inline-block py-2 px-6 bg-${template.color}-darkblue hover:bg-${template.color}-blue text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200`}
              link={secondaryButton}
            />
          ) : (
            <ExternalLink
              className={`hidden lg:inline-block py-2 px-6 bg-${template.color}-darkblue hover:bg-${template.color}-blue text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200`}
              link={secondaryButton}
            />
          ))}
      </nav>
      <div className={`${menu ? null : "hidden"} navbar-menu relative z-50`}>
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={showMenu}
        />
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <button
              aria-label="Navbar Menu button"
              className="navbar-close"
              onClick={showMenu}
            >
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500"
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
            <ul>
              {links &&
                links?.map((link, index) => (
                  <li className="mb-1" key={index}>
                    {link?.type === "linkInternal" ? (
                      <InternalLink
                        className="block p-4 text-sm font-semibold text-gray-900 hover:bg-webriq-lightblue hover:text-webriq-darkblue rounded"
                        link={link}
                      />
                    ) : (
                      <ExternalLink
                        className="block p-4 text-sm font-semibold text-gray-900 hover:bg-webriq-lightblue hover:text-webriq-darkblue rounded"
                        link={link}
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              {primaryButton?.label &&
                (primaryButton?.type === "linkInternal" ? (
                  <InternalLink
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                    link={primaryButton}
                  />
                ) : (
                  <ExternalLink
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-l-xl rounded-t-xl"
                    link={primaryButton}
                  />
                ))}
              {secondaryButton?.label &&
                (secondaryButton?.type === "linkInternal" ? (
                  <InternalLink
                    className={`block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-${template.color}-darkblue hover:bg-${template.color}-blue rounded-l-xl rounded-t-xl`}
                    link={secondaryButton}
                  />
                ) : (
                  <ExternalLink
                    className={`block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-${template.color}-darkblue hover:bg-${template.color}-blue rounded-l-xl rounded-t-xl`}
                    link={secondaryButton}
                  />
                ))}
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
