import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalBtnOrLink } from "helper"


function VariantB({ caption, title, portfolios, primaryButton }) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container px-4 mx-auto">
          <div className="mb-16 flex flex-wrap justify-center md:justify-between items-center">
            <div className="text-center lg:text-left">
              {caption && (
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
              )}
              {title && (
                <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h1>
              )}
            </div>
            <div className="hidden lg:block text-right mt-5 md:mt-0 lg:mt-0 xl:mt-0">
              {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200" />}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-4">
            {portfolios?.slice(0, portfolioLength).map((content, index) => (
              <div
                className="relative mb-4 w-full md:w-1/2 lg:w-1/3 px-4"
                key={index}
              >
                {content?.mainImage?.image?.asset?._ref && (
                  <div className="relative md:mb-5 lg:mb-5 xl:mb-5 mx-auto rounded overflow-hidden">
                    <Image
                      src={urlFor(content?.mainImage?.image)}
                      width="480px"
                      height="320px"
                      size="100vw"
                      style={{ width: "100%", height: "auto", objectFit: "cover" }}
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      placeholder="blur"
                    />
                    <div className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 bg-gray-900 p-6 flex flex-col items-start rounded">
                      <span className="text-webriq-lightblue">
                        {content?.dateAdded}
                      </span>
                      <p className="mb-auto md:text-xl lg:text-2xl text-white font-bold">
                        {content?.title}
                      </p>
                      {content?.primaryButton?.label && <ConditionalBtnOrLink value={content?.primaryButton} style="inline-block py-2 px-4 border-2 border-gray-400 hover:border-webriq-darkblue bg-transparent text-gray-50 hover:bg-webriq-darkblue hover:text-white transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose" />}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="block text-center lg:hidden mt-5 md:mt-0 lg:mt-0 xl:mt-0">
            {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200" />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
