import React from "react";
import { urlFor } from "../../../lib/sanity";
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
      <div className="py-20 bg-gray-50 radius-for-skewed overflow-hidden">
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
          {testimony?.map((item) => (
            <>
              {/* <div className="hidden lg:block absolute top-0 left-0 lg:w-1/3 px-3 -ml-80 opacity-25">
                <div className="p-8 bg-white rounded shadow text-center">
                  <div style={{background: 'url("atis-assets/elements/quote-grey.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left'}}>
                    <p className="mb-8 text-gray-500 leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et placerat metus. Morbi aliquet felis sit amet erat finibus, ac condimentum ligula ornare.</p>
                    <img className="mb-2 mx-auto w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="" />
                    <h4 className="mb-1 text-2xl font-bold font-heading">Alice Bradley</h4>
                    <p className="text-gray-500">Backend Developer</p>
                  </div>
                </div>
              </div> */}
              <div className="flex max-w-6xl px-2 mx-auto">
                <div className="mb-4 min-w-full lg:w-1/3 px-3">
                  <div className="p-8 bg-white rounded shadow text-center">
                    <div>
                      <p className="mb-8 text-gray-500 leading-loose">
                        {item.plainText}
                      </p>
                      <img
                        className="mb-2 mx-auto w-12 h-12 rounded-full object-cover"
                        src={urlFor(item.mainImage)}
                        alt=""
                      />
                      <h4 className="mb-1 text-2xl font-bold font-heading">
                        {item.name}
                      </h4>
                      <p className="text-gray-500">{item.jobTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="hidden lg:block absolute top-0 right-0 lg:w-1/3 px-3 -mr-80 opacity-25">
                <div className="p-8 bg-white rounded shadow text-center">
                  <div style={{background: 'url("atis-assets/elements/quote-grey.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left'}}>
                    <p className="mb-8 text-gray-500 leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et placerat metus. Morbi aliquet felis sit amet erat finibus, ac condimentum ligula ornare.</p>
                    <img className="mb-2 mx-auto w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="" />
                    <h4 className="mb-1 text-2xl font-bold font-heading">Alice Bradley</h4>
                    <p className="text-gray-500">Backend Developer</p>
                  </div>
                </div>
              </div> */}
            </>
          ))}
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
export default React.memo(VariantC);
