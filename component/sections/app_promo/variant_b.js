import React, { useState } from "react";
import { urlFor } from "../../../lib/sanity";

function VariantB({ subtitle, title, description, statistics, images }) {
  //for image carousel
  let [currentPosition, setCurrentPosition] = useState(0); // Initial image index value

  const arrowRightClick = () => {
    currentPosition !== images.length - 1 // Check index length
      ? setCurrentPosition(currentPosition + 1)
      : setCurrentPosition((currentPosition = 0));
  };
  const arrowLeftClick = () => {
    currentPosition !== 0 // Check index length
      ? setCurrentPosition(currentPosition - 1)
      : setCurrentPosition((currentPosition = images.length - 1));
  };

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-md">
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
                <p className="mb-16 text-gray-500 leading-loose">
                  {description}
                </p>
                <div className="flex flex-wrap">
                  {statistics &&
                    statistics.map((items, index) => (
                      <div className="mb-8 w-full lg:w-1/2" key={index}>
                        <h4 className="text-gray-500">{items?.label}</h4>
                        <span className="text-3xl lg:text-4xl font-bold">
                          {items?.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full lg:w-1/2 px-4">
              {images &&
                (images.length > 1 ? (
                  <>
                    <button
                      className="order-1 xl:order-0 mr-12 inline-block p-6 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
                      onClick={arrowLeftClick}
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
                    <div className="object-contain h-96 md:w-2/5 xl:w-2/5 order-0 xl:order-1">
                      <img
                        className="h-96 mx-auto mb-8 xl:mb-0"
                        src={urlFor(images?.[currentPosition])}
                      />
                    </div>
                    <button
                      className="order-2 xl:order-2 ml-12 inline-block p-6 bg-white rounded-full shadow text-webriq-darkblue hover:text-webriq-babyblue focus:outline-none"
                      onClick={arrowRightClick}
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
                  </>
                ) : (
                  <div className="object-contain h-96 md:w-2/5 xl:w-2/5 order-0 xl:order-1">
                    <img
                      className="h-96 mx-auto mb-8 xl:mb-0"
                      src={urlFor(images?.[0])}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
