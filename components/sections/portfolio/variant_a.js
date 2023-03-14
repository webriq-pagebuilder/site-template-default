import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalBtnOrLink } from "helper";


function VariantA({ caption, title, portfoliosWithCategory }) {
  let portfolioLength = 8; //set initial number of portfolios to display for this variant
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); //set the first index category as initial value

  //creates new array of items filtered by active tab
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-16 max-w-lg mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap py-1 bg-white rounded text-sm">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={`Portfolio ${content?.category} tab`}
                    key={index}
                    className={`w-auto mb-1 mx-auto py-2 px-4 ${
                      activeTab === content?.category
                        ? "bg-gray-50 text-webriq-darkblue shadow rounded font-bold focus:outline-none transition duration-200"
                        : "hover:bg-webriq-lightblue text-gray-700 hover:text-webriq-blue rounded hover:shadow font-bold focus:outline-none transition duration-200"
                    }`}
                    onClick={() => setActiveTab(content?.category)}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {portfoliosPerCategory?.[0]?.content && (
            <div className="flex flex-wrap mb-8 -mx-4">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(0, portfolioLength)
                ?.map((content, index) => (
                  <div
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-8 px-4"
                    key={index}
                  >
                    <div className="relative w-[352px] h-[256px] mx-auto rounded-lg overflow-hidden">
                      {content?.mainImage?.image && (
                        <Image
                          className="w-full h-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={
                            content?.mainImage?.alt ?? `portfolio-image${index}`
                          }
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          placeholder="blur"
                        />
                      )}
                      <div className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 bg-gray-900 flex justify-center items-center rounded-lg">
                        {content?.primaryButton?.label && <ConditionalBtnOrLink value={content?.primaryButton} style="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose" />}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              <ConditionalBtnOrLink value={portfoliosPerCategory?.[0]?.primaryButton} style="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
