import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { Text } from "components/ui/Text";

import { FeaturesProps } from ".";

function VariantA({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-16 text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && <Text type="h1">{title}</Text>}
          </div>
          <div className="flex flex-wrap -mx-4">
            {features &&
              features?.map((feature, index) => {
                return (
                  <div
                    className="w-full px-4 mt-16 mb-12 md:w-1/2 lg:mb-0 lg:w-1/4"
                    key={index}
                  >
                    <span className="inline-block p-3 mb-4 rounded bg-webriq-lightblue text-webriq-blue md:mb-6">
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
                      <p className="leading-loose text-gray-500">
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
