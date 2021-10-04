import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "lib/sanity";

function VariantA({
  template,
  image,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="skewed-bottom-right">
      <div
        className={`bg-${template.bg}-lightblue pt-12 lg:pt-20 pb-20 radius-for-skewed`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left">
                <div className="max-w-md mx-auto lg:mx-0">
                  <h1 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title && (
                      <>
                        <span>{String(title).split("*")[0]}</span>
                        <span className={`text-${template.color}-900`}>
                          {String(title).split("*")[1]}
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                <div className="max-w-sm mx-auto lg:mx-0">
                  {description && (
                    <p className="mb-6 text-gray-700 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <a
                        aria-label={`Header ${
                          primaryButton?.label ?? "Primary"
                        } button which directs to ${
                          primaryButton?.type === "linkExternal"
                            ? primaryButton?.externalLink
                            : primaryButton?.type === "linkInternal"
                            ? primaryButton?.internalLink
                            : "not found"
                        } page`}
                        className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                        target={primaryButton?.linkTarget}
                        rel={
                          primaryButton?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                        href={
                          primaryButton.type === "linkInternal"
                            ? primaryButton.internalLink === "Home" ||
                              primaryButton.internalLink === "home"
                              ? "/"
                              : primaryButton.internalLink
                            : primaryButton.externalLink
                        }
                      >
                        {primaryButton.label}
                      </a>
                    )}
                    {secondaryButton?.label && (
                      <a
                        aria-label={`Header ${
                          secondaryButton?.label ?? "Secondary"
                        } button which directs to ${
                          secondaryButton?.type === "linkExternal"
                            ? secondaryButton?.externalLink
                            : secondaryButton?.type === "linkInternal"
                            ? secondaryButton?.internalLink
                            : "not found"
                        } page`}
                        className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        target={secondaryButton?.linkTarget}
                        rel={
                          secondaryButton?.linkTarget === "_blank"
                            ? "noopener noreferrer"
                            : null
                        }
                        href={
                          secondaryButton.type === "linkInternal"
                            ? secondaryButton.internalLink === "Home" ||
                              secondaryButton.internalLink === "home"
                              ? "/"
                              : secondaryButton.internalLink
                            : secondaryButton.externalLink
                        }
                      >
                        {secondaryButton.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
              <div className="relative" style={{ zIndex: 0 }}>
                {image && (
                  <img
                    className="h-128 w-full max-w-lg object-cover rounded-3xl md:rounded-br-none"
                    src={urlFor(image)}
                    alt="header-main-image"
                  />
                )}
                <img
                  className="hidden md:block absolute h-28 w-28"
                  style={{ top: "-2rem", right: "3rem", zIndex: "-1" }}
                  src="assets/elements/webriq-blue-dark-up.png"
                  alt="webriq-blue-dark-up-mainImage-element"
                />
                <img
                  className="hidden md:block absolute h-36 w-36"
                  style={{ bottom: "-2rem", right: "-2rem", zIndex: "-1" }}
                  src="assets/elements/wing-webriq-blue-down.png"
                  alt="wing-webriq-blue-down-mainImage-element"
                />
                <img
                  className="hidden md:block absolute"
                  style={{ top: "3rem", right: "-3rem", zIndex: "-1" }}
                  src="assets/elements/bullets-gray-right.svg"
                  alt="bullets-gray-right-mainImage-element"
                />
                <img
                  className="hidden md:block absolute"
                  style={{ bottom: "2.5rem", left: "-4.5rem", zIndex: "-1" }}
                  src="assets/elements/bullets-gray-left.svg"
                  alt="bullets-gray-left-mainImage-element"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
