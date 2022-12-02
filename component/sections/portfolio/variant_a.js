import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";

function VariantA({ caption, title, portfoliosWithCategory }) {
  let portfolioLength = 8; //set initial number of portfolios to display for this variant
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); //set the first index category as initial value

  //creates new array of items filtered by active tab
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap py-1 bg-white rounded text-sm">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={`Portfolio ${content?.category} tab`}
                    key={index}
                    className={`w-auto mb-1 mx-auto py-2 px-4 ${
                      activeTab === content?.category
                        ? "bg-gray-50 text-webriq-darkblue shadow rounded font-bold focus:outline-none transition duration-200"
                        : "hover:bg-webriq-lightblue text-gray-700 hover:text-webriq-blue rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                    onClick={() => setActiveTab(content?.category)}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {portfoliosPerCategory?.[0]?.content && (
            <div className="flex flex-wrap mb-8 -mx-4">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(0, portfolioLength)
                ?.map((content, index) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-8 px-4"
                    key={index}
                  >
                    {content?.mainImage?.image?.asset?._ref && (
                      <div className="relative mx-auto rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(content?.mainImage?.image)}
                          layout="responsive"
                          width="352px"
                          height="256px"
                          objectFit="cover"
                          alt={
                            content?.mainImage?.alt ?? `portfolio-image${index}`
                          }
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                        <div className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 bg-gray-900 flex justify-center items-center rounded-lg">
                          {content?.primaryButton?.label &&
                            (content?.primaryButton?.type === "linkInternal" ? (
                              <a
                                href={
                                  content?.primaryButton?.internalLink ===
                                    "Home" ||
                                  content?.primaryButton?.internalLink ===
                                    "home"
                                    ? "/"
                                    : `/${
                                        content?.primaryButton?.internalLink ===
                                        undefined
                                          ? "page-not-found"
                                          : content?.primaryButton?.internalLink
                                      }`
                                }
                                aria-label={`Click here to ${content?.primaryButton?.label}`}
                                className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                                target={content?.primaryButton?.linkTarget}
                                rel={
                                  content?.primaryButton?.linkTarget ===
                                  "_blank"
                                    ? "noopener noreferrer"
                                    : null
                                }
                              >
                                {content?.primaryButton?.label ??
                                  "View Project"}
                              </a>
                            ) : (
                              <a
                                aria-label={`Click here to ${content?.primaryButton?.label}`}
                                className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                                target={content?.primaryButton?.linkTarget}
                                href={`${
                                  content?.primaryButton?.externalLink ===
                                  undefined
                                    ? "link-not-found"
                                    : content?.primaryButton?.externalLink
                                }`}
                                rel={
                                  content?.primaryButton?.linkTarget ===
                                  "_blank"
                                    ? "noopener noreferrer"
                                    : null
                                }
                              >
                                {content?.primaryButton?.label ??
                                  "View Project"}
                              </a>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              {portfoliosPerCategory?.[0]?.primaryButton?.type ===
              "linkInternal" ? (
                <a
                  href={
                    portfoliosPerCategory?.[0]?.primaryButton?.internalLink ===
                      "Home" ||
                    portfoliosPerCategory?.[0]?.primaryButton?.internalLink ===
                      "home"
                      ? "/"
                      : `/${
                          !portfoliosPerCategory?.[0]?.primaryButton
                            ?.internalLink
                            ? "page-not-found"
                            : portfoliosPerCategory?.[0]?.primaryButton
                                ?.internalLink
                        }`
                  }
                  aria-label={`Click here to ${
                    portfoliosPerCategory?.[0]?.primaryButton?.label ??
                    "View More Projects"
                  }`}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                  target={portfoliosPerCategory?.[0]?.primaryButton?.linkTarget}
                  rel={
                    portfoliosPerCategory?.[0]?.primaryButton?.linkTarget ===
                    "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {portfoliosPerCategory?.[0]?.primaryButton?.label}
                </a>
              ) : (
                <a
                  aria-label={`Click here to ${
                    portfoliosPerCategory?.[0]?.primaryButton?.label ??
                    "View More Projects"
                  }`}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                  target={portfoliosPerCategory?.[0]?.primaryButton?.linkTarget}
                  href={`${
                    portfoliosPerCategory?.[0]?.primaryButton?.externalLink ===
                    undefined
                      ? "link-not-found"
                      : portfoliosPerCategory?.[0]?.primaryButton?.externalLink
                  }`}
                  rel={
                    portfoliosPerCategory?.[0]?.primaryButton?.linkTarget ===
                    "_blank"
                      ? "noopener noreferrer"
                      : null
                  }
                >
                  {portfoliosPerCategory?.[0]?.primaryButton?.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
