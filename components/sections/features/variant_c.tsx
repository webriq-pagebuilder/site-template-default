import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";

function VariantC({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-16 text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl font-bold font-heading lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap justify-start -mx-3">
            {features &&
              features.map((feature, index) => {
                return (
                  <div className="w-full px-3 mb-6 lg:w-1/2" key={index}>
                    <Card className="flex flex-wrap h-full p-6">
                      <div>
                        <span className="inline-block p-3 mb-4 mr-6 rounded-lg bg-webriq-lightblue md:p-5 lg:mb-0">
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
                    </Card>
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
