import React from "react";
import { urlFor } from "lib/sanity";
function VariantD({
  template,
  image,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="overflow-hidden">
      <div className="relative bg-gray-50 pt-20 pb-24 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 flex items-center">
              <div className="w-full text-center lg:text-left">
                <div className="relative max-w-md mx-auto lg:mx-0">
                  <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title && <span>{title}</span>}
                  </h2>
                </div>
                <div className="relative max-w-sm mx-auto lg:mx-0">
                  {description && (
                    <p className="mb-6 text-gray-400 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton && (
                      <a
                        className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-webriq-blue hover:bg-webriq-darkblue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
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
                    {secondaryButton && (
                      <a
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
            <div className="w-full lg:w-1/2 px-4">
              {image && (
                <img
                  className="lg:absolute top-0 my-12 lg:my-0 h-full w-full lg:w-1/2 rounded-3xl lg:rounded-none object-cover"
                  src={urlFor(image)}
                  alt="header-mainImage"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
