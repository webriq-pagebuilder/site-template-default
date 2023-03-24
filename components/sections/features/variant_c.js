import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

function VariantC({ caption, title, features }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md mx-auto text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap -mx-3 justify-start">
            {features &&
              features.map((feature, index) => {
                return (
                  <div className="mb-6 w-full lg:w-1/2 px-3" key={index}>
                    <div className="p-6 flex flex-wrap bg-white shadow rounded-lg h-full">
                      <div>
                        <span className="mb-4 lg:mb-0 mr-6 inline-block p-3 md:p-5 rounded-lg bg-webriq-lightblue">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ?? "features-main-image"
                              }
                            />
                          )}
                        </span>
                      </div>
                      <div className="w-full lg:w-2/3">
                        <p className="mb-2 text-2xl font-bold font-heading">
                          {feature?.title}
                        </p>
                        <p className="text-gray-500">{feature?.plainText}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantC);
