import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { PortfolioProps } from ".";

function VariantA({ caption, title, portfoliosWithCategory }: PortfolioProps) {
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
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto mb-8 text-center md:mb-16">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="mb-6 text-4xl font-bold font-heading lg:text-5xl">
                {title}
              </h1>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap py-1 text-sm bg-white rounded">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={content?.category}
                    key={index}
                    className={`mx-auto mb-1 w-auto px-4 py-2 ${
                      activeTab === content?.category
                        ? "rounded bg-gray-50 font-bold text-webriq-darkblue shadow transition duration-200 focus:outline-none"
                        : "rounded font-bold text-gray-700 transition duration-200 hover:bg-webriq-lightblue hover:text-webriq-blue hover:shadow focus:outline-none"
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
                    className="w-full px-4 mb-8 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
                    key={index}
                  >
                    <div className="relative mx-auto h-[256px] w-[352px] overflow-hidden rounded-lg">
                      {content?.mainImage?.image && (
                        <Image
                          className="object-cover w-full h-full"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={
                            content?.mainImage?.alt ?? `portfolio-image${index}`
                          }
                        />
                      )}
                      <div className="absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-75">
                        {content?.primaryButton?.label && (
                          <ConditionalLink
                            variant="outline"
                            ariaLabel={content?.primaryButton?.label}
                            link={content?.primaryButton}
                            className="bg-transparent border-2 border-gray-400 !outline-none hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900"
                          >
                            {content?.primaryButton?.label}
                          </ConditionalLink>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              <ConditionalLink
                ariaLabel={portfoliosPerCategory?.[0]?.primaryButton?.label}
                link={portfoliosPerCategory?.[0]?.primaryButton}
                className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
              >
                {portfoliosPerCategory?.[0]?.primaryButton?.label}
              </ConditionalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
