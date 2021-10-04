import React from "react";
import { urlFor } from "lib/sanity";

function VariantB({ caption, title, portfolios, buttonLabel }) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant
  const [viewPortfolios, setViewPortfolios] = React.useState(portfolioLength);
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        {portfolios && (
          <div className="container px-4 mx-auto">
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
                <div
                  className="relative mb-4 w-full md:w-1/2 lg:w-1/3 px-4"
                  key={index}
                >
                  {content?.mainImage && (
                    <div className="relative h-80 mb-5 mx-auto rounded">
                      <img
                        className="h-80 w-full relative rounded object-cover"
                        src={urlFor(content?.mainImage)}
                        alt={`portfolio-image${index}`}
                      />
                      <div className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 bg-gray-900 p-6 flex flex-col items-start rounded">
                        <span className="text-gray-400">
                          {content?.dateAdded}
                        </span>
                        <p className="mb-auto text-xl lg:text-2xl text-white font-bold">
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
                            className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white bg-transparent text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
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
                            {content?.primaryButton?.label}
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

export default React.memo(VariantB);
