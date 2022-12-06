import { logoLink } from "helper";
import { urlFor } from "lib/sanity";
import React from "react";

function VariantA({ logo, title, text, button }) {
  return (
    <section>
      <div>
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="py-20 bg-gray-50 rounded-tl-3xl rounded-br-3xl">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            {logo?.image && (
              <a
                href={logoLink()}
                aria-label={
                  logoLink() === "/" ? "Go to home page" : `Go to ${logoLink()}`
                }
                className="mb-6 inline-block text-3xl font-bold leading-none"
              >
                <img
                  className="h-14"
                  src={urlFor(logo?.image)}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </a>
            )}
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
            <p className="max-w-md mx-auto mb-6 text-gray-700 leading-loose">
              {text}
            </p>
            {button?.label &&
              (button?.type === "linkInternal" ? (
                <a
                  href={
                    button?.internalLink === "Home" ||
                    button?.internalLink === "home"
                      ? "/"
                      : `/${
                          !button?.internalLink
                            ? "page-not-found"
                            : button?.internalLink
                        }`
                  }
                  aria-label={`Call to action ${
                    button?.label ?? "primary"
                  } button which directs to ${
                    !button?.internalLink
                      ? "page-not-found"
                      : button?.internalLink
                  }`}
                  className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                  target={button?.linkTarget}
                  rel={
                    button?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {button?.label}
                </a>
              ) : (
                <a
                  aria-label={`Call to action ${
                    button?.label ?? "primary"
                  } button which directs to ${
                    button?.externalLink === undefined
                      ? "link-not-found"
                      : button?.externalLink
                  }`}
                  className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose rounded-l-xl rounded-t-xl transition duration-200"
                  target={button?.linkTarget}
                  href={`${
                    button?.externalLink === undefined
                      ? "link-not-found"
                      : button?.externalLink
                  }`}
                  rel={
                    button?.linkTarget === "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {button?.label}
                </a>
              ))}
          </div>
        </div>
      </div>
      <div>
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
        </svg>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
