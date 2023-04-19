import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ConditionalBtnOrLink } from "helper";


function VariantB({
  template,
  images,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="relative bg-gray-50">
      <div className="relative py-12 lg:py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="max-w-md mx-auto">
                  <h1 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                    {title && (
                      <>
                        <span>{String(title).split("*")[0]}</span>
                        <span className={`text-${template.color}-900`}>
                          {String(title).split("*")[1]}
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                <div className="max-w-md mx-auto">
                  {description && (
                    <p className="mb-6 text-gray-500 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <ConditionalBtnOrLink value={primaryButton} style={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`} />
                    )}
                    {secondaryButton?.label && (
                      <ConditionalBtnOrLink value={secondaryButton} style="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {images && (
              <div className="w-full lg:w-1/2 px-4">
                <div className="sm:flex mb-3 lg:mb-4 lg:ml-6">
                  {images?.[0]?.image && (
                    <Image
                      className="mb-3 sm:mb-0 sm:w-1/3 mr-2 rounded-xl md:rounded-3xl lg:rounded-br-none overflow-hidden relative object-cover"
                      sizes="100vw"
                      src={urlFor(images?.[0]?.image)}
                      width={941}
                      height={734}
                      alt={images?.[0]?.alt ?? "header-image-1"}
                    />
                  )}
                  {images?.[1]?.image && (
                    <Image
                      className="sm:w-2/3 sm:ml-2 rounded-xl md:rounded-3xl lg:rounded-bl-none overflow-hidden relative object-cover"
                      sizes="100vw"
                      src={urlFor(images?.[1]?.image)}
                      width={1050}
                      height={701}
                      alt={images?.[1]?.alt ?? "header-image-2"}
                    />
                  )}
                </div>
                <div className="sm:flex mb-3 lg:mb-4 lg:mr-6">
                  {images?.[2]?.image?.asset?._ref && (
                    <Image
                      className="mb-3 md:mb-0 sm:w-2/3 mr-2 rounded-xl md:rounded-3xl lg:rounded-br-none overflow-hidden object-cover"
                      sizes="100vw"
                      src={urlFor(images?.[2]?.image)}
                      width={1050}
                      height={701}
                      alt={images?.[2]?.alt ?? "header-image-3"}
                    />
                  )}
                  {images?.[3]?.image?.asset?._ref && (
                    <Image
                      className="sm:w-1/3 sm:ml-2 rounded-xl md:rounded-3xl lg:rounded-bl-none overflow-hidden object-cover"
                      sizes="100vw"
                      src={urlFor(images?.[3]?.image)}
                      width={941}
                      height={734}
                      alt={images?.[3]?.alt ?? "header-image-4"}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
