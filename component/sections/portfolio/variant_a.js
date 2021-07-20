import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantA({ caption, title, portfolios }) {
  const [category, setCategory] = React.useState(portfolios?.[0]?.category); //set the first index category as initial value
  let [viewProjects, setViewPortfolios] = React.useState(8);

  //creates new array of items based on selected category
  const newArray = portfolios?.filter(content => content?.category === category).map(items => ({ ...items, default: viewProjects }));
  
  const handleViewMoreProjects = () => {
    const added = newArray?.[0]?.content?.length - viewProjects
    viewProjects !== newArray?.[0]?.content?.length // Check index length
      ? setViewPortfolios(viewProjects + added)
      : setViewPortfolios((viewProjects = 8));
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
            {caption && <span className="text-webriq-darkblue font-bold">{caption}</span>}
            {title && <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">{title}</h2>}
            {portfolios && (
              <div className="inline-flex flex-wrap py-1 sm:px-1 sm:space-x-1 bg-white rounded text-sm">
                {portfolios?.map((content, index) => (
                  <button
                    key={index}
                    onClick={() => setCategory(content?.category)}
                    className={`w-full sm:w-auto mb-1 sm:mb-0 mx-1 sm:mx-0 py-2 px-4 ${
                      category === content?.category
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
          {newArray && (
            <div className="flex flex-wrap mb-8 -mx-4">
              {newArray?.[0]?.content?.slice(0, newArray?.[0]?.default)?.map((items, index) => (
                <div className="w-1/4 mb-8 px-4" key={index}>
                  {items?.mainImage && (
                    <div className="relative mx-auto h-64 w-full rounded-lg">
                      <img 
                        className="mx-auto h-64 w-full rounded object-cover" 
                        src={urlFor(items?.mainImage)} 
                      />
                      <div className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 bg-gray-900 flex justify-center items-center rounded-lg">
                        <a 
                          className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose" 
                          target={items?.primaryButton?.linkTarget}
                          rel={
                            items?.primaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            items?.primaryButton?.type === "linkExternal"
                              ? items?.primaryButton?.externalLink
                              : items?.primaryButton?.type === "linkInternal"
                                ? items?.primaryButton?.internalLink === "Home" ||
                                  items?.primaryButton?.internalLink === "home"
                                  ? "/"
                                  : items?.primaryButton?.internalLink
                                : "page-not-found"
                          }
                        >
                          View Project
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="text-center">
            {newArray?.[0]?.content?.length === viewProjects || newArray?.[0]?.content?.length < 8 ? null : (
              <button 
                className="inline-block py-2 px-6 leading-loose rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold" 
                onClick={handleViewMoreProjects}
                id={newArray?.[0]?._key}
              >
                View More Projects
              </button>
            )}
          </div>
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

export default React.memo(VariantA);
