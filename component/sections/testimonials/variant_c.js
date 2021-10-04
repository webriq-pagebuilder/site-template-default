import React from "react";
import { urlFor } from "lib/sanity";

function VariantC({ caption, title, testimonials }) {
  const [testimony, setTestimony] = React.useState(testimonials);

  const slider = (action) => {
    if (action === "next") {
      // Remove first element
      let firstItem = testimony?.shift();

      // Push the deleted element to last index
      setTestimony((prevState) => [...prevState, firstItem]);
    } else if (action === "prev") {
      // Remove last element
      let lastItem = testimony?.pop();

      // Push the deleted element to first index
      setTestimony((prevState) => [lastItem, ...prevState]);
    }
  };

  return (
    <section>
      <div className="p-20 bg-gray-50 radius-for-skewed overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pb-6 lg:pb-16">
          <div className="flex flex-wrap justify-center lg:justify-between items-center text-center lg:text-left">
            <div className="w-full lg:w-4/5 mb-4 lg:mb-0">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            </div>
            <div className="w-full lg:w-1/5">
              {testimony?.length >= 4 && (
                <button
                  aria-label="Show Previous Testimonial button"
                  className="mr-4 bg-white p-5 rounded-full shadow-md text-webriq-darkblue hover:text-webriq-darkblue transition duration-200"
                  onClick={() => slider("prev")}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              )}
              {testimony?.length >= 4 && (
                <button
                  aria-label="Show Next Testimonial button"
                  className="bg-white p-5 rounded-full shadow-md text-webriq-darkblue hover:text-webriq-darkblue transition duration-200"
                  onClick={() => slider("next")}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="relative flex">
          {testimony &&
            testimony?.map((item, index) => (
              <div className="flex max-w-6xl px-2 mx-auto" key={index}>
                <div className="mb-4 min-w-full lg:w-1/3 px-3">
                  <div className="p-8 bg-white rounded shadow text-center">
                    <div>
                      <p className="mb-8 text-gray-500 leading-loose">
                        {item?.testimony}
                      </p>
                      <img
                        className="mb-2 mx-auto w-12 h-12 rounded-full object-cover"
                        src={urlFor(item?.mainImage)}
                        alt={`testimonial-source-${item?.name}-profile-image`}
                      />
                      <h4 className="mb-1 text-2xl font-bold font-heading">
                        {item?.name}
                      </h4>
                      <p className="text-gray-500">{item?.jobTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
