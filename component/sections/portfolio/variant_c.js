import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantC({ caption, title, portfolio, primaryButton }) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap justify-center md:justify-between items-center">
            <div className="text-center lg:text-left">
              {caption && (
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
              )}
              {title && (
                <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h1>
              )}
            </div>
            <div className="mt-5 md:mt-0 lg:mt-0 xl:mt-0">
              {primaryButton?.label &&
                (primaryButton?.type === "linkInternal" ? (
                  <Link
                    href={
                      primaryButton?.internalLink === "Home" ||
                      primaryButton?.internalLink === "home"
                        ? "/"
                        : `/${
                            primaryButton?.internalLink === undefined
                              ? "page-not-found"
                              : primaryButton?.internalLink
                          }`
                    }
                  >
                    <a
                      aria-label={`Click here to ${primaryButton?.label}`}
                      className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                      target={primaryButton?.linkTarget}
                      rel={
                        primaryButton?.linkTarget === "_blank"
                          ? "noopener noreferrer"
                          : null
                      }
                    >
                      {primaryButton?.label}
                    </a>
                  </Link>
                ) : (
                  <a
                    aria-label={`Click here to ${primaryButton?.label}`}
                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                    target={primaryButton?.linkTarget}
                    href={`${
                      primaryButton?.externalLink === undefined
                        ? "link-not-found"
                        : primaryButton?.externalLink
                    }`}
                    rel={
                      primaryButton?.linkTarget === "_blank"
                        ? "noopener noreferrer"
                        : null
                    }
                  >
                    {primaryButton?.label}
                  </a>
                ))}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-4">
            {portfolio?.slice(0, portfolioLength)?.map((content, index) => (
              <div className="mb-8 w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                {content?.mainImage?.image && (
                  <div className="bg-white rounded">
                    <Image
                      src={urlFor(content?.mainImage?.image)}
                      layout="responsive"
                      width="480px"
                      height="320px"
                      objectFit="cover"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                    <div className="p-6">
                      <span className="text-gray-500">
                        {content?.dateAdded}
                      </span>
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {content?.title}
                      </p>
                      {content?.primaryButton?.label &&
                        (content?.primaryButton?.type === "linkInternal" ? (
                          <Link
                            href={
                              content?.primaryButton?.internalLink === "Home" ||
                              content?.primaryButton?.internalLink === "home"
                                ? "/"
                                : `/${
                                    content?.primaryButton?.internalLink ===
                                    undefined
                                      ? "page-not-found"
                                      : content?.primaryButton?.internalLink
                                  }`
                            }
                          >
                            <a
                              aria-label={`Click here to ${content?.primaryButton?.label}`}
                              className="flex text-webriq-darkblue hover:text-webriq-blue font-bold"
                              target={content?.primaryButton?.linkTarget}
                              rel={
                                content?.primaryButton?.linkTarget === "_blank"
                                  ? "noopener noreferrer"
                                  : null
                              }
                            >
                              <svg
                                className="mr-3 w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                {content?.primaryButton?.label ??
                                  "View this project"}
                              </span>
                            </a>
                          </Link>
                        ) : (
                          <a
                            aria-label={`Click here to ${content?.primaryButton?.label}`}
                            className="flex text-webriq-darkblue hover:text-webriq-blue font-bold"
                            target={content?.primaryButton?.linkTarget}
                            href={`${
                              content?.primaryButton?.externalLink === undefined
                                ? "link-not-found"
                                : content?.primaryButton?.externalLink
                            }`}
                            rel={
                              content?.primaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                          >
                            <svg
                              className="mr-3 w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              {content?.primaryButton?.label ??
                                "View this project"}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantC);
