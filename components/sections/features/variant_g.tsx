import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";
import { Text } from "components/ui/Text";

function VariantG({
  caption,
  title,
  description,
  images,
  tags,
}: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full px-4 mb-12 lg:mb-0 lg:w-1/2">
              <div className="max-w-md">
                {caption && (
                  <span className="font-bold text-brand-primary">
                    {caption}
                  </span>
                )}
                {title && (
                  <Text type="h1" className="mb-3">
                    {title}
                  </Text>
                )}
                {description && (
                  <p className="max-w-sm mb-6 leading-loose text-gray-500">
                    {description}
                  </p>
                )}
                <ul className="font-bold text-gray-500">
                  {tags &&
                    tags.map((item) => (
                      <li className="flex items-center mb-2" key={item}>
                        <svg
                          className="w-5 h-5 mr-2 text-brand-primary-foreground"
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
            {images && (
              <div className="w-full lg:w-1/2">
                <div className="items-end mb-4 lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="h-full px-3 mb-4 lg:mb-0 lg:w-2/3 xl:mb-0 xl:w-2/3 2xl:mb-0 2xl:w-2/3">
                    {images?.[0]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-[269px] w-full object-cover"
                          src={urlFor(images[0]?.image)}
                          sizes="100vw"
                          width={356}
                          height={192}
                          alt={images[0]?.alt ?? "features-image-1"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-full px-3 lg:w-1/3 xl:w-1/3 2xl:w-1/3">
                    {images?.[1]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="object-cover w-full h-auto"
                          src={urlFor(images[1]?.image)}
                          sizes="100vw"
                          width={166}
                          height={128}
                          alt={images[1]?.alt ?? "features-image-2"}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="items-start mb-4 lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="h-full px-3 mb-4 lg:mb-0 lg:w-1/3 xl:mb-0 xl:w-1/3 2xl:mb-0 2xl:w-1/3">
                    {images?.[2]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-[269px] w-full object-cover lg:h-[126px]"
                          src={urlFor(images[2]?.image)}
                          width={166}
                          height={128}
                          sizes="100vw"
                          alt={images[2]?.alt ?? "features-image-3"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-full px-3 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
                    {images?.[3]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="object-cover w-full h-auto"
                          src={urlFor(images[3]?.image)}
                          width={356}
                          height={192}
                          sizes="100vw"
                          alt={images[3]?.alt ?? "features-image-4"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantG);
