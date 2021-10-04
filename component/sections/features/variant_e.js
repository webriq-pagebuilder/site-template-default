import React, { useState } from "react";
import { urlFor } from "../../../lib/sanity";

function VariantE({ featuredItems }) {
  //for image carousel
  let [item, setItem] = useState(0); // Initial image index value

  const slider = (action) => {
    action === "next"
      ? item !== featuredItems.length - 1
        ? setItem((prevState) => prevState + 1)
        : setItem(0)
      : item >= 1
      ? setItem((prevState) => prevState - 1)
      : setItem(featuredItems.length - 1);
  };
  return (
    <section>
      {featuredItems?.length === 0 ? null : (
        <div className="py-20 bg-gray-50 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="relative flex">
              <div className="xl:absolute inset-y-0 left-0 -ml-6 xl:flex items-center">
                {featuredItems?.length >= 2 && (
                  <button
                    aria-label="Show Previous Feature button"
                    className="p-4 bg-webriq-blue hover:bg-webriq-darkblue focus:outline-none rounded-l-xl rounded-t-xl text-white z-10"
                    onClick={() => slider("prev")}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <div className="w-full xl:w-4/5 xl:ml-auto">
                {featuredItems?.[item]?.mainImage && (
                  <img
                    className="md:max-w-xl xl:max-w-4xl mx-auto relative object-cover rounded"
                    src={urlFor(featuredItems?.[item]?.mainImage)}
                    // alt={image[currentImage].alt}
                  />
                )}
                <div className="xl:absolute top-0 left-0 mt-12 xl:mt-20 max-w-xl mx-auto xl:mx-0 p-6 xl:py-24 rounded bg-white border-gray-50 shadow text-center">
                  <span className="font-bold text-webriq-darkblue">
                    {featuredItems?.[item]?.subtitle &&
                      featuredItems?.[item]?.subtitle}
                  </span>
                  <h2 className="text-5xl font-bold font-heading">
                    {featuredItems?.[item]?.heading &&
                      featuredItems?.[item]?.heading}
                  </h2>
                  <p className="max-w-xs mx-auto text-gray-500 leading-loose">
                    {featuredItems?.[item]?.description &&
                      featuredItems?.[item]?.description}
                  </p>
                </div>
              </div>
              <div className="xl:absolute inset-y-0 right-0 -mr-8 xl:flex items-center">
                {featuredItems?.length >= 2 && (
                  <button
                    aria-label="Show Next Feature button"
                    className="p-4 bg-webriq-blue hover:bg-webriq-darkblue focus:outline-none rounded-r-xl rounded-t-xl text-white"
                    onClick={() => slider("next")}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
        </svg>
      </div>
    </section>
  );
}

export default React.memo(VariantE);
