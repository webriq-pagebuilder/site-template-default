import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalBtnOrLink } from "helper";

function VariantC({ caption, title, portfolios, primaryButton }) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
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
            <div className="hidden lg:block mt-5 md:mt-0 lg:mt-0 xl:mt-0">
              {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200" />}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-4">
            {portfolios?.slice(0, portfolioLength)?.map((content, index) => (
              <div className="relative mb-8 w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                {content?.mainImage?.image && (
                  <div className="bg-white h-full rounded overflow-hidden">
                    <Image
                      className="w-[480px] h-[320px] object-cover"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="100vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                    <div className="p-6">
                      <span className="text-gray-500">
                        {content?.dateAdded}
                      </span>
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {content?.title}
                      </p>
                      {content?.primaryButton?.label && <ConditionalBtnOrLink value={content?.primaryButton} style="flex text-webriq-darkblue hover:text-webriq-blue font-bold" />}
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

export default React.memo(VariantC);
