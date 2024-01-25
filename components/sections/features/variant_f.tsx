import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { Text } from "components/ui/Text";

function VariantF({
  caption,
  title,
  description,
  images,
  primaryButton,
}: FeaturesProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="flex w-full px-4 mb-12 lg:mb-0 lg:w-1/2">
              <div className="max-w-md">
                <span className="font-bold text-brand-primary">{caption}</span>
                {title && <Text className="mb-6">{title}</Text>}
                {description && (
                  <div className="max-w-sm mb-6">
                    <p className="leading-loose text-gray-500">{description}</p>
                  </div>
                )}
                {primaryButton?.label && (
                  <div className="flex flex-wrap lg:-ml-5">
                    <ConditionalLink
                      link={primaryButton}
                      className=" lg:w-auto lg:ml-5"
                      ariaLabel={primaryButton?.label}
                    >
                      {primaryButton?.label}
                    </ConditionalLink>
                  </div>
                )}
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
export default React.memo(VariantF);
