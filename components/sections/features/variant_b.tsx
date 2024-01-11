import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";

function VariantB({
  caption,
  title,
  description,
  features,
  tags,
}: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
              <div className="max-w-md lg:mx-auto">
                {caption && (
                  <span className="font-bold text-webriq-darkblue">
                    {caption}
                  </span>
                )}
                {title && (
                  <Text type="h1" className="my-2 ">
                    {title}
                  </Text>
                )}
                {description && (
                  <p className="mb-6 leading-loose text-gray-500">
                    {description}
                  </p>
                )}
                <ul className="font-bold text-gray-500">
                  {tags &&
                    tags.map((item) => (
                      <li className="flex mb-4" key={item}>
                        <svg
                          className="w-6 h-6 mr-2 text-webriq-babyblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap w-full -mx-4 lg:w-1/2">
              {features &&
                features?.map((feature, index) =>
                  index % 2 === 0 ? (
                    <div
                      className="w-full px-4 mb-8 md:w-1/2 lg:mb-0"
                      key={index}
                    >
                      <Card className="py-6 pl-6 pr-4 mb-8">
                        <span className="inline-block p-3 mb-4 rounded-lg bg-webriq-lightblue">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="mb-2 text-2xl font-bold font-heading">
                          {feature?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {feature?.plainText}
                        </p>
                      </Card>
                    </div>
                  ) : (
                    <div className="w-full px-4 md:w-1/2 lg:mt-12" key={index}>
                      <Card className="py-6 pl-6 pr-4 mb-8 lg:mb-0">
                        <span className="inline-block p-3 mb-4 rounded bg-webriq-lightblue">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="mb-2 text-2xl font-bold font-heading">
                          {feature?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {feature?.plainText}
                        </p>
                      </Card>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
