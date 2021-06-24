import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "../../../lib/sanity";
function VariantG({ caption, title, description, images, featureItems }) {
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
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 px-4">
              <div className="max-w-md">
                {caption && (
                  <span className="text-webriq-darkblue font-bold">
                    {caption}
                  </span>
                )}
                {title && (
                  <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mb-6 max-w-sm text-gray-400 leading-loose">
                    {description}
                  </p>
                )}
                <ul className="text-gray-500 font-bold">
                  {featureItems &&
                    featureItems.map((item) => (
                      <li className="mb-2 flex items-center" key={item}>
                        <svg
                          className="mr-2 w-5 h-5 text-webriq-blue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  {/*                   
                  <li className="mb-2 flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-webriq-blue"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Morbi mollis metus pretium ultrices tincidunt</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 w-5 h-5 text-webriq-blue"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Etiam lectus nunc, commodo et risus in</span>
                  </li> */}
                </ul>
              </div>
            </div>
            {images && (
              <div className="w-full lg:w-1/2">
                <div className="mb-4 flex flex-wrap items-end">
                  {images?.[0] && (
                    <div className="mb-4 lg:mb-0 w-full lg:w-2/3 px-3">
                      <img
                        className="w-full h-32 lg:h-48 object-cover rounded"
                        src={urlFor(images?.[0])}
                        alt=""
                      />
                    </div>
                  )}
                  {images?.[1] && (
                    <div className="w-full lg:w-1/3 px-3">
                      <img
                        className="w-full h-32 object-cover rounded"
                        src={urlFor(images?.[1])}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-start">
                  {images?.[2] && (
                    <div className="mb-4 lg:mb-0 w-full lg:w-1/3 px-3">
                      <img
                        className="w-full h-32 object-cover rounded"
                        src={urlFor(images?.[2])}
                        alt=""
                      />
                    </div>
                  )}
                  {images?.[3] && (
                    <div className="w-full lg:w-2/3 px-3">
                      <img
                        className="w-full h-32 lg:h-48 object-cover rounded"
                        src={urlFor(images?.[3])}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
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
VariantG.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.array,
  images: PropTypes.array,
  featureItems: PropTypes.array,
};
export default React.memo(VariantG);
