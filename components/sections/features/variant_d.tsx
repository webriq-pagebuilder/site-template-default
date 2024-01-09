import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";

function VariantD({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-8 text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl font-bold font-heading lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap justify-center -mx-4">
            {features.map((feature, index) => (
              <div className="w-full px-4 mt-8 lg:mb-0 lg:w-1/3" key={index}>
                <Card className="h-full px-6 py-12 text-center">
                  <span className="inline-block p-3 mb-6 rounded-lg bg-webriq-lightblue md:p-5">
                    {feature?.mainImage?.image?.asset?._ref && (
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
                  <p className="px-8 mb-4 text-2xl font-bold font-heading">
                    {feature?.title}
                  </p>
                  <p className="text-gray-500">{feature?.plainText}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
