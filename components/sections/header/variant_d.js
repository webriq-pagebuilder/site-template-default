import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ConditionalBtnOrLink } from "helper";


function VariantD({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="overflow-hidden">
      <div className="relative bg-gray-50 py-20 md:pt-20 lg:pt-28 xl:pt-28 2xl:pt-28 md:pb-40 lg:pb-40 xl:pb-40 2xl:pb-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 flex items-center">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="relative max-w-md mx-auto">
                  <h1 className="max-w-md mb-3 text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold">
                    {title && <span>{title}</span>}
                  </h1>
                </div>
                <div className="relative max-w-md mx-auto">
                  {description && (
                    <p className="mb-6 text-gray-500 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && <ConditionalBtnOrLink value={primaryButton} style={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`} />}
                    {secondaryButton?.label && <ConditionalBtnOrLink value={secondaryButton} style="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200" />}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {mainImage?.image?.asset?._ref && (
                <div className="lg:absolute xl:absolute 2xl:absolute top-0 my-12 lg:my-0 xl:my-0 2xl:my-0 h-full w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 rounded-none">
                  <Image
                    src={urlFor(mainImage?.image)}
                    width={1050}
                    height={700}
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                    alt={mainImage?.alt ?? "header-main-image"}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
