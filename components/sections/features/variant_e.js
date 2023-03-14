import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";

function VariantE({ featuredItems }) {
  //for image carousel
  let [item, setItem] = React.useState(0); // Initial image index value

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
      <div className="py-20 bg-gray-50 radius-for-skewed overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="relative flex">
            <div className="order-0 absolute z-40 mt-20 md:mt-40 lg:mt-60 left-0 -mx-3 xl:-mx-6 xl:flex items-center">
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
            <div className="order-1 w-full xl:w-4/5 ml-auto">
              {featuredItems?.[item]?.mainImage?.image?.asset?._ref && (
                <div className="md:max-w-xl xl:max-w-4xl mx-auto rounded-md overflow-hidden">
                  <Image
                    className="relative object-cover"
                    src={urlFor(featuredItems?.[item]?.mainImage?.image)}
                    sizes="100vw"
                    width={896}
                    height={575}
                    alt={
                      featuredItems?.[item]?.mainImage?.alt ??
                      `features-image-${item}`
                    }
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
              <div className="xl:absolute top-0 left-0 md:mt-12 lg:mt-12 xl:mt-20 max-w-xl mx-auto xl:mx-0 p-6 md:p-10 lg:p-10 xl:py-24 rounded bg-white border-gray-50 shadow text-center">
                <span className="text-xs md:text-sm lg:text-md xl:text-lg font-bold text-webriq-darkblue">
                  {featuredItems?.[item]?.subtitle &&
                    featuredItems?.[item]?.subtitle}
                </span>
                <h1 className="md:mt-5 lg:mt-5 text-lg md:text-3xl lg:text-5xl font-bold font-heading">
                  {featuredItems?.[item]?.title && featuredItems?.[item]?.title}
                </h1>
                <p className="md:mt-5 lg:mt-5 text-xs md:text-sm lg:text-sm mx-auto text-gray-500 leading-loose">
                  {featuredItems?.[item]?.description &&
                    featuredItems?.[item]?.description}
                </p>
              </div>
            </div>
            <div className="order-2 absolute mt-20 md:mt-40 lg:mt-60 right-0 -mx-3 xl:-mx-6 xl:flex items-center">
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
    </section>
  );
}

export default React.memo(VariantE);
