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
                  <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title === undefined ? null : (
                      <>
                        <span>{String(title).split("*")[0]}</span>
                        <span className={`text-${template.color}-600`}>
                          {String(title).split("*")[1]}
                        </span>
                      </>
                    )}
                  </h2>
                </div>
                <div className="max-w-sm mx-auto lg:mx-0">
                  {description === undefined ? null : (
                    <p className="mb-6 text-gray-400 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <a
                        className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-${template.color}-blue hover:bg-${template.color}-darkblue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                        target={primaryButton?.pageAccess === "openLinkToNewTab" ? "_blank" : null}
                        rel={primaryButton?.pageAccess === "openLinkToNewTab" ? "noopener noreferrer" : null}
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
                        className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        target={secondaryButton?.pageAccess === "openLinkToNewTab" ? "_blank" : null}
                        rel={secondaryButton?.pageAccess === "openLinkToNewTab" ? "noopener noreferrer" : null}
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
                {image === undefined ? null : (
                  <img
                    className="h-128 w-full max-w-lg object-cover rounded-3xl md:rounded-br-none"
                    src={urlFor(image)}
                    alt=""
                  />
                )}
                {/* <img
                  className="hidden md:block absolute"
                  style={{ top: "-2rem", right: "3rem", zIndex: "-1" }}
                  src="atis-assets/elements/green-dark-up.svg"
                  alt=""
                />
                <img
                  className="hidden md:block absolute"
                  style={{ bottom: "-2rem", right: "-2rem", zIndex: "-1" }}
                  src="atis-assets/elements/wing-green-down.svg"
                  alt=""
                />
                <img
                  className="hidden md:block absolute"
                  style={{ top: "3rem", right: "-3rem", zIndex: "-1" }}
                  src="atis-assets/elements/bullets-gray-right.svg"
                  alt=""
                />
                <img
                  className="hidden md:block absolute"
                  style={{ bottom: "2.5rem", left: "-4.5rem", zIndex: "-1" }}
                  src="atis-assets/elements/bullets-gray-left.svg"
                  alt=""
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-for-radius">
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

VariantA.propTypes = {
  template: PropTypes.object,
  image: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  primaryButton: PropTypes.object,
  secondaryButton: PropTypes.object,
};
export default React.memo(VariantA);
