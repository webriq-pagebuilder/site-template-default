import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";

function VariantB ({ profile }) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="-mx-4 mb-4 flex flex-wrap">
            {portfolios?.slice(0, portfolioLength).map((content, index) => (
              <div
                className="relative mb-4 w-full px-4 md:w-1/2 lg:w-1/3"
                key={index}
              >
                <div className="relative mx-auto overflow-hidden rounded md:mb-5 lg:mb-5 xl:mb-5">
                  {content?.mainImage?.image && (
                    <Image
                      className="h-80 w-full object-cover"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="100vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                  )}

                  <div className="absolute inset-0 z-10 flex flex-col items-start rounded bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-75">
                    <span className="text-webriq-lightblue">
                      {content?.dateAdded}
                    </span>
                    <p className="mb-auto font-bold text-white md:text-xl lg:text-2xl">
                      {content?.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
