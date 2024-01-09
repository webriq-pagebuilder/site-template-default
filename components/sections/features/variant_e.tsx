import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";

function VariantE({ featuredItems }: FeaturesProps) {
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
      <div className="py-20 overflow-x-auto radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="relative flex">
            <div className="absolute left-0 z-40 items-center mt-20 -mx-3 order-0 md:mt-40 lg:mt-60 xl:-mx-6 xl:flex">
              {featuredItems?.length >= 2 && (
                <button
                  aria-label="Show Previous Feature"
                  className="z-10 p-4 text-white rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue focus:outline-none"
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
            <div className="order-1 w-full ml-auto xl:w-4/5">
              {featuredItems?.[item]?.mainImage?.image?.asset?._ref && (
                <div className="mx-auto overflow-hidden rounded-md md:max-w-xl xl:max-w-4xl">
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
                  />
                </div>
              )}
              <Card className="top-0 left-0 max-w-xl p-6 mx-auto text-center md:mt-12 md:p-10 lg:mt-12 lg:p-10 xl:absolute xl:mx-0 xl:mt-20 xl:py-24">
                <span className="text-xs font-bold lg:text-md text-webriq-darkblue md:text-sm xl:text-lg">
                  {featuredItems?.[item]?.subtitle &&
                    featuredItems?.[item]?.subtitle}
                </span>
                <h1 className="text-lg font-bold font-heading md:mt-5 md:text-3xl lg:mt-5 lg:text-5xl">
                  {featuredItems?.[item]?.title && featuredItems?.[item]?.title}
                </h1>
                <p className="mx-auto text-xs leading-loose text-gray-500 md:mt-5 md:text-sm lg:mt-5 lg:text-sm">
                  {featuredItems?.[item]?.description &&
                    featuredItems?.[item]?.description}
                </p>
              </Card>
            </div>
            <div className="absolute right-0 items-center order-2 mt-20 -mx-3 md:mt-40 lg:mt-60 xl:-mx-6 xl:flex">
              {featuredItems?.length >= 2 && (
                <button
                  aria-label="Show Next Feature"
                  className="p-4 text-white rounded-r-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue focus:outline-none"
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
