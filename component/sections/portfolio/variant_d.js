import React from "react";
import { urlFor } from "lib/sanity";

function VariantD({ caption, title, portfolios, buttonLabel }) {
  let portfoliosPerPage = 6,
    count = 0; // default number of portfolios per category
  const [activeTab, setActiveTab] = React.useState(portfolios?.[0]?.category); // set the first index category as initial value
  const [portfoliosToShow, setPortfoliosToShow] = React.useState(count + 1); // set initial value as 1
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // group portfolios per category
  const portfoliosPerCategory = portfolios?.filter(
    (data) => data?.category === activeTab
  );

  // transform portfoliosPerCategory array into groups of 6 portfolios
  const splitPortfolios = (arr, size, groups) => {
    const chunks = arr?.reduce(
      (array, items, index) =>
        (index % size
          ? array[array?.length - 1]?.push(items)
          : array?.push([items])) && array,
      []
    );
    if (chunks[chunks?.length - 1]?.length < groups) {
      chunks?.pop();
    }
    return chunks;
  };

  // pass values to splitPortfolios functional component
  const newArray = splitPortfolios(
    portfoliosPerCategory?.[0]?.content, // portfoliosPerCategory content array
    portfoliosPerPage,
    Math.ceil(portfoliosPerCategory?.length / portfoliosPerPage)
  );

  return (
    <section>
      <div className="p-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
            {portfolios && (
              <div className="inline-flex flex-wrap py-1 sm:px-1 sm:space-x-1 bg-white rounded text-sm">
                {portfolios?.map((content, index) => (
                  <button
                    aria-label={`Portfolios ${content?.category} tab`}
                    key={index}
                    onClick={() => setActiveTab(content?.category)}
                    className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                      activeTab === content?.category
                        ? "bg-gray-50 text-webriq-darkblue shadow rounded font-bold focus:outline-none transition duration-200"
                        : "hover:bg-webriq-lightblue text-gray-500 hover:text-webriq-blue rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {newArray &&
            newArray
              ?.slice(count, portfoliosToShow)
              ?.map((portfolio, index) => (
                <div className="flex -mx-4 mb-12" key={index}>
                  <div className="flex flex-wrap w-full lg:w-1/2 mb-8 lg:mb-0">
                    {portfolio?.slice(count, count + 2)?.map((content) => (
                      <div
                        className="w-full lg:w-1/2 px-4 mb-8"
                        key={content?._key}
                      >
                        {content?.mainImage && (
                          <div className="relative">
                            <img
                              className="h-64 w-full rounded-lg object-cover"
                              src={urlFor(content?.mainImage)}
                              alt={`portfolio-image-${content?._key}`}
                            />
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                              <div className="max-w-md my-auto text-xs">
                                <span className="text-webriq-blue font-bold">
                                  {content?.subtitle}
                                </span>
                                <h2 className="text-white font-bold my-5">
                                  {content?.heading}
                                </h2>
                                <div className="max-w-xs my-5">
                                  <p className="mb-6 text-gray-400">
                                    {content?.description}
                                  </p>
                                  <a
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                    href={
                                      content?.primaryButton?.type ===
                                      "linkExternal"
                                        ? content?.primaryButton?.externalLink
                                        : content?.primaryButton?.type ===
                                          "linkInternal"
                                        ? content?.primaryButton
                                            ?.internalLink === "Home" ||
                                          content?.primaryButton
                                            ?.internalLink === "home"
                                          ? "/"
                                          : content?.primaryButton?.internalLink
                                        : "page-not-found"
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {portfolio?.slice(count + 2, count + 3)?.map((content) => (
                      <div className="w-full px-4" key={content?._key}>
                        {content?.mainImage && (
                          <div className="relative">
                            <img
                              className="h-96 w-full rounded-lg object-cover"
                              src={urlFor(content?.mainImage)}
                              alt={`portfolio-image-${content?._key}`}
                            />
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                              <div className="max-w-md my-auto text-sm">
                                <span className="text-webriq-blue font-bold">
                                  {content?.subtitle}
                                </span>
                                <h2 className="text-4xl text-white font-bold my-5">
                                  {content?.heading}
                                </h2>
                                <div className="max-w-xs my-5">
                                  <p className="mb-6 text-gray-400">
                                    {content?.description}
                                  </p>
                                  <a
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                    href={
                                      content?.primaryButton?.type ===
                                      "linkExternal"
                                        ? content?.primaryButton?.externalLink
                                        : content?.primaryButton?.type ===
                                          "linkInternal"
                                        ? content?.primaryButton
                                            ?.internalLink === "Home" ||
                                          content?.primaryButton
                                            ?.internalLink === "home"
                                          ? "/"
                                          : content?.primaryButton?.internalLink
                                        : "page-not-found"
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="w-full lg:w-1/2">
                    {portfolio?.slice(count + 3, count + 4)?.map((content) => (
                      <div className="w-full px-4 mb-8" key={content?._key}>
                        {content?.mainImage && (
                          <div className="relative">
                            <img
                              className="h-96 w-full rounded-lg object-cover"
                              src={urlFor(content?.mainImage)}
                              alt={`portfolio-image-${content?._key}`}
                            />
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                              <div className="max-w-md my-auto text-sm">
                                <span className="text-webriq-blue font-bold">
                                  {content?.subtitle}
                                </span>
                                <h2 className="text-4xl text-white font-bold my-5">
                                  {content?.heading}
                                </h2>
                                <div className="max-w-xs my-5">
                                  <p className="mb-6 text-gray-400">
                                    {content?.description}
                                  </p>
                                  <a
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                    target={content?.primaryButton?.linkTarget}
                                    rel={
                                      content?.primaryButton?.linkTarget ===
                                      "_blank"
                                        ? "noopener noreferrer"
                                        : null
                                    }
                                    href={
                                      content?.primaryButton?.type ===
                                      "linkExternal"
                                        ? content?.primaryButton?.externalLink
                                        : content?.primaryButton?.type ===
                                          "linkInternal"
                                        ? content?.primaryButton
                                            ?.internalLink === "Home" ||
                                          content?.primaryButton
                                            ?.internalLink === "home"
                                          ? "/"
                                          : content?.primaryButton?.internalLink
                                        : "page-not-found"
                                    }
                                  >
                                    {content?.primaryButton?.label ??
                                      "See More"}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex flex-wrap">
                      {portfolio
                        ?.slice(count + 4, count + 5)
                        ?.map((content) => (
                          <div
                            className="relative w-full lg:w-1/2 px-4 mb-8 lg:mb-0"
                            key={content?._key}
                          >
                            {content?.mainImage && (
                              <div className="relative">
                                <img
                                  className="h-64 w-full rounded-lg object-cover"
                                  src={urlFor(content?.mainImage)}
                                  alt={`portfolio-image${content?._key}`}
                                />
                                <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                                  <div className="max-w-md my-auto text-xs">
                                    <span className="text-webriq-blue font-bold">
                                      {content?.subtitle}
                                    </span>
                                    <h2 className="text-white font-bold my-5">
                                      {content?.heading}
                                    </h2>
                                    <div className="max-w-xs my-5">
                                      <p className="mb-6 text-gray-400">
                                        {content?.description}
                                      </p>
                                      <a
                                        className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                        target={
                                          content?.primaryButton?.linkTarget
                                        }
                                        rel={
                                          content?.primaryButton?.linkTarget ===
                                          "_blank"
                                            ? "noopener noreferrer"
                                            : null
                                        }
                                        href={
                                          content?.primaryButton?.type ===
                                          "linkExternal"
                                            ? content?.primaryButton
                                                ?.externalLink
                                            : content?.primaryButton?.type ===
                                              "linkInternal"
                                            ? content?.primaryButton
                                                ?.internalLink === "Home" ||
                                              content?.primaryButton
                                                ?.internalLink === "home"
                                              ? "/"
                                              : content?.primaryButton
                                                  ?.internalLink
                                            : "page-not-found"
                                        }
                                      >
                                        {content?.primaryButton?.label ??
                                          "See More"}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      {portfolio
                        ?.slice(count + 5, portfoliosPerPage)
                        ?.map((content) => (
                          <div
                            className="relative w-full lg:w-1/2 px-4"
                            key={content?._key}
                          >
                            {content?.mainImage && (
                              <div className="relative">
                                <img
                                  className="h-64 w-full rounded-lg object-cover"
                                  src={urlFor(content?.mainImage)}
                                  alt={`portfolio-image-${content?._key}`}
                                />
                                <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 p-6 bg-gray-900 justify-center rounded-lg">
                                  <div className="max-w-md my-auto text-xs">
                                    <span className="text-webriq-blue font-bold">
                                      {content?.subtitle}
                                    </span>
                                    <h2 className="text-white font-bold my-5">
                                      {content?.heading}
                                    </h2>
                                    <div className="max-w-xs my-5">
                                      <p className="mb-6 text-gray-400">
                                        {content?.description}
                                      </p>
                                      <a
                                        className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                                        target={
                                          content?.primaryButton?.linkTarget
                                        }
                                        rel={
                                          content?.primaryButton?.linkTarget ===
                                          "_blank"
                                            ? "noopener noreferrer"
                                            : null
                                        }
                                        href={
                                          content?.primaryButton?.type ===
                                          "linkExternal"
                                            ? content?.primaryButton
                                                ?.externalLink
                                            : content?.primaryButton?.type ===
                                              "linkInternal"
                                            ? content?.primaryButton
                                                ?.internalLink === "Home" ||
                                              content?.primaryButton
                                                ?.internalLink === "home"
                                              ? "/"
                                              : content?.primaryButton
                                                  ?.internalLink
                                            : "page-not-found"
                                        }
                                      >
                                        {content?.primaryButton?.label ??
                                          "See More"}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          <div className="text-center">
            {portfoliosPerCategory?.[0]?.content?.length > portfoliosPerPage &&
              !showMore && (
                <button
                  aria-label="View More Portfolios button"
                  className="inline-block py-2 px-6 leading-loose rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold"
                  onClick={() => {
                    setPortfoliosToShow(newArray?.length);
                    setShowMore(true);
                  }}
                >
                  {buttonLabel ?? "View More Projects"}
                </button>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
