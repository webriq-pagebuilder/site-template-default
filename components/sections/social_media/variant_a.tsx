import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantA ({ profile }) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-lg text-center md:mb-16">
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap rounded bg-white py-1 text-sm">
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
            <div className="-mx-4 mb-8 flex flex-wrap">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(0, portfolioLength)
                ?.map((content, index) => (
                  <div
                    className="mb-8 w-full px-4 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
                    key={index}
                  >
                    <div className="relative mx-auto h-[256px] w-[352px] overflow-hidden rounded-lg">
                      {content?.mainImage?.image && (
                        <Image
                          className="h-full w-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={
                            content?.mainImage?.alt ?? `portfolio-image${index}`
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
