import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantA({ caption, title, features }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            )}
          </div>
          <div className="flex flex-wrap -mx-4">
            {features &&
              features?.map((feature, index) => {
                return (
                  <div
                    className="mb-12 mt-16 lg:mb-0 w-full md:w-1/2 lg:w-1/4 px-4"
                    key={index}
                  >
                    <span className="mb-4 md:mb-6 inline-block bg-webriq-lightblue p-3 text-webriq-blue rounded">
                      {feature?.mainImage?.image && (
                        <Image
                          className="object-scale-down"
                          src={urlFor(feature?.mainImage?.image)}
                          width={40}
                          height={40}
                          alt={
                            feature?.mainImage?.alt ?? `features-image-${index}`
                          }
                        />
                      )}
                    </span>

                    {feature?.title && (
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {feature?.title}
                      </p>
                    )}
                    {feature?.plainText && (
                      <p className="text-gray-500 leading-loose">
                        {feature?.plainText}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
