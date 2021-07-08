import React from "react";
import { urlFor } from "../../../lib/sanity";
function VariantD({
  /* template,*/ caption,
  title,
  portfolios,
  primaryButton,
}) {
  const [category, setCategory] = React.useState("category_2");

  const renderCategory = () => {
    if (category === "category_1") {
      return <p>Category 1</p>;
    } else if (category === "category_2") {
      return (
        <div className="flex flex-wrap -mx-4 mb-12">
          {portfolios && (
            <div className="flex flex-wrap w-full lg:w-1/2 mb-8 lg:mb-0">
              <div className="w-full lg:w-1/2 px-4 mb-8">
                {portfolios[0] && (
                  <img
                    className="h-64 w-full rounded-lg object-cover"
                    src={urlFor(portfolios[0].mainImage)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-full lg:w-1/2 px-4 mb-8">
                {portfolios[1] && (
                  <img
                    className="h-64 w-full rounded-lg object-cover"
                    src={urlFor(portfolios[1].mainImage)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-full px-4 mb-8">
                {portfolios[2] && (
                  <img
                    className="lg:h-auto w-full rounded-lg object-cover"
                    src={urlFor(portfolios[2].mainImage)}
                    alt=""
                  />
                )}
              </div>
            </div>
          )}
          {portfolios && (
            <div className="flex flex-wrap w-full lg:w-1/2">
              <div className="w-full px-4 mb-8">
                {portfolios?.[3] && (
                  <div className="relative">
                    <img
                      className="h-128 w-full rounded-lg object-cover"
                      src={urlFor(portfolios?.[3].mainImage)}
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-80 rounded-lg" />
                    <div className="absolute inset-0 p-6 flex justify-center">
                      <div className="max-w-md my-auto">
                        <span className="text-webriq-darkblue font-bold">
                          {portfolios[3].subtitle}
                        </span>
                        <h2 className="text-4xl lg:text-5xl text-white font-bold">
                          {portfolios[3].heading}
                        </h2>
                        <div className="max-w-xs">
                          <p className="mb-6 text-gray-400">
                            {portfolios[3].description}
                          </p>
                          <a
                            className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose"
                            href="#"
                          >
                            See More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                {portfolios?.[4] && (
                  <img
                    className="h-64 w-full rounded-lg object-cover"
                    src={urlFor(portfolios?.[4].mainImage)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-full lg:w-1/2 px-4">
                {portfolios?.[5] && (
                  <img
                    className="h-64 w-full rounded-lg object-cover"
                    src={urlFor(portfolios?.[5].mainImage)}
                    alt=""
                  />
                )}
              </div>
            </div>
          )}
        </div>
      );
    } else if (category === "category_3") {
      return <p>Category 3</p>;
    } else if (category === "category_4") {
      return <p>Category 4</p>;
    } else {
      return <p>Category 1</p>;
    }
  };
  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption === undefined ? null : (
              <span className="text-webriq-darkblue font-bold">
                {/* Dolor sit amet consectutar */}
                {caption}
              </span>
            )}
            {title === undefined ? null : (
              <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {/* Lates Projects */}
                {title}
              </h2>
            )}
            {caption === undefined && title === undefined ? null : (
              <div className="inline-flex flex-wrap py-1 sm:px-1 sm:space-x-1 bg-white rounded text-sm">
                <button
                  onClick={() => setCategory("category_1")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${category === "category_1"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                >
                  Category 1
                </button>
                <button
                  onClick={() => setCategory("category_2")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${category === "category_2"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                >
                  Category 2
                </button>
                <button
                  onClick={() => setCategory("category_3")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${category === "category_3"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                >
                  Category 3
                </button>
                <button
                  onClick={() => setCategory("category_4")}
                  className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${category === "category_4"
                      ? "bg-gray-50 text-gray-900 shadow rounded font-bold focus:outline-none transition duration-200"
                      : "hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                >
                  Category 4
                </button>
              </div>
            )}
          </div>
          {renderCategory()}
          {primaryButton && (
            <div className="text-center">
              <a
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
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
            </div>
          )}
        </div>
      </div>
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
