import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantC({caption, title, portfolios}) {
  let [viewProjects, setViewPortfolios] = React.useState(6);

  const handleViewMoreProjects = () => {
    const added = portfolios.length - viewProjects
    viewProjects !== portfolios.length - 1 // Check index length
      ? setViewPortfolios(viewProjects + added)
      : setViewPortfolios((viewProjects = 0));
  };

  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap justify-center md:justify-between items-center">
            <div className="text-center lg:text-left">
              {caption && <span className="text-webriq-blue font-bold">{caption}</span>}
              {title && <h2 className="text-4xl lg:text-5xl font-bold font-heading">{title}</h2>}
            </div>
            {portfolios.length === viewProjects || portfolios.length < 6 ? null : (
              <button 
                className="hidden md:inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                onClick={handleViewMoreProjects}
              >
                View More Projects
              </button>
            )}
          </div>
          {portfolios && (
            <div className="flex flex-wrap -mx-4 mb-4">
              {portfolios?.slice(0, viewProjects).map((content, index) => (
                <div className="mb-8 w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                  {content?.mainImage && (
                    <div className="bg-white rounded">
                      <img 
                        className="rounded-t h-80 w-full relative object-cover" 
                        src={urlFor(content?.mainImage)} 
                        alt="" 
                      />
                      <div className="p-6">
                        <span className="text-gray-400">{content?.dateAdded}</span>
                        <h3 className="mb-4 text-2xl font-bold font-heading">{content?.heading}</h3>
                        <a className="flex text-webriq-blue hover:text-webriq-darkblue font-bold" href={urlFor(content?.mainImage)}>
                          <svg className="mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>View Portfolio</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="skew skew-bottom mr-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  );
}

export default React.memo(VariantC);
