import React from "react";
import { urlFor } from "lib/sanity";

function VariantC({ caption, title, portfolios, buttonLabel }) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant
  const [viewPortfolios, setViewPortfolios] = React.useState(portfolioLength);
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        {portfolios && (
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
              <div>
                {portfolios?.length > portfolioLength && !showMore && (
                  <button
                    aria-label="View More Portfolios button"
                    className="hidden md:inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                    onClick={() => {
                      setViewPortfolios(portfolios?.length);
                      setShowMore(true);
                    }}
                  >
                    {buttonLabel ?? "View More Projects"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-4">
              {portfolios?.slice(0, viewPortfolios).map((content, index) => (
                <div className="mb-8 w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                  {content?.mainImage && (
                    <div className="bg-white rounded">
                      <img
                        className="rounded-t h-80 w-full relative object-cover"
                        src={urlFor(content?.mainImage)}
                        alt={`portfolio-image${index}`}
                      />
                      <div className="p-6">
                        <span className="text-gray-500">
                          {content?.dateAdded}
                        </span>
                        <p className="mb-4 text-2xl font-bold font-heading">
                          {content?.heading}
                        </p>
                        {content?.primaryButton?.label && (
                          <a
                            aria-label={`Portfolio ${
                              content?.primaryButton?.label ?? "View Project"
                            } button which directs to ${
                              content?.primaryButton?.type === "linkExternal"
                                ? content?.primaryButton?.externalLink
                                : content?.primaryButton?.type ===
                                  "linkInternal"
                                ? content?.primaryButton?.internalLink
                                : "not found"
                            } page`}
                            className="flex text-webriq-darkblue hover:text-webriq-blue font-bold"
                            target={content?.primaryButton?.linkTarget}
                            rel={
                              content?.primaryButton?.linkTarget === "_blank"
                                ? "noopener noreferrer"
                                : null
                            }
                            href={
                              content?.primaryButton?.type === "linkExternal"
                                ? content?.primaryButton?.externalLink
                                : content?.primaryButton?.type ===
                                  "linkInternal"
                                ? content?.primaryButton?.internalLink ===
                                    "Home" ||
                                  content?.primaryButton?.internalLink ===
                                    "home"
                                  ? "/"
                                  : content?.primaryButton?.internalLink
                                : "page-not-found"
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
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(VariantC);
