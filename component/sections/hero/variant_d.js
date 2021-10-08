import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

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
      <div className="relative bg-gray-50 py-20 md:pt-20 lg:pt-28 xl:pt-28 2xl:pt-28 md:pb-40 lg:pb-40 xl:pb-40 2xl:pb-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 flex items-center">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="relative max-w-md mx-auto">
                  <h1 className="max-w-md mb-3 text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold">
                    {title && <span>{title}</span>}
                  </h1>
                </div>
                <div className="relative max-w-md mx-auto">
                  {description && (
                    <p className="mb-6 text-gray-500 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton && (
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
                        className="inline-block mb-3 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 md:mr-3 lg:mr-3 xl:mr-3 2xl:mr-3 w-full md:w-auto lg:w-auto xl:w-auto 2xl:w-auto py-2 px-6 leading-loose bg-webriq-darkblue hover:bg-webriq-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
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
                        aria-label={`Header ${
                          secondaryButton?.label ?? "Secondary"
                        } button which directs to ${
                          secondaryButton?.type === "linkExternal"
                            ? secondaryButton?.externalLink
                            : secondaryButton?.type === "linkInternal"
                            ? secondaryButton?.internalLink
                            : "not found"
                        } page`}
                        className="inline-block w-full md:w-auto lg:w-auto xl:w-auto 2xl:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
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
            <div className="w-full px-4 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {image && (
                <div className="lg:absolute xl:absolute 2xl:absolute top-0 my-12 lg:my-0 xl:my-0 2xl:my-0 h-full w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 rounded-none">
                  <Image
                    priority={true}
                    src={urlFor(image)}
                    layout="responsive"
                    width="1050px"
                    height="700px"
                    objectFit="contain"
                    alt="header-mainImage"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
