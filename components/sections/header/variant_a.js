import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ConditionalBtnOrLink } from "helper";


function VariantA({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section className="skewed-bottom-right">
      <div
        className={`bg-${template.bg}-lightblue pt-12 lg:pt-20 pb-20 radius-for-skewed`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="max-w-md mx-auto">
                  <h1 className="mb-3 text-2xl md:text-4xl lg:text-5xl font-bold font-heading">
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
                    <p className="my-6 text-xs md:text-base lg:text-base text-gray-500 leading-loose">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <ConditionalBtnOrLink value={primaryButton} style={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`} />
                    )}
                    {secondaryButton?.label && (
                      <ConditionalBtnOrLink value={primaryButton} style="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
              {mainImage && (
                <div className="relative w-full max-w-md">
                  {mainImage?.image?.asset?._ref && (
                    <Image
                      className="rounded-3xl lg:h-[448px] md:rounded-br-none overflow-hidden object-cover"
                      src={urlFor(mainImage?.image)}
                      sizes="100vw"
                      width={448}
                      height={448}
                      alt={mainImage?.alt ?? "header-main-image"}
                    />
                  )}
                  <div
                    className="hidden md:block absolute"
                    style={{ top: "-2rem", right: "3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/webriq-blue-dark-up.png"
                      width={112}
                      height={112}
                      alt="webriq-blue-dark-up-mainImage-element"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{ bottom: "-2rem", right: "-2rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/wing-webriq-blue-down.png"
                      width={144}
                      height={144}
                      alt="wing-webriq-blue-down-mainImage-element"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{ top: "3rem", right: "-3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-right.svg"
                      width={115}
                      height={157}
                      alt="bullets-gray-right-mainImage-element"
                    />
                  </div>
                  <div
                    className="hidden md:block absolute"
                    style={{
                      bottom: "2.5rem",
                      left: "-4.5rem",
                      zIndex: "-1",
                    }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-left.svg"
                      width={157}
                      height={115}
                      alt="bullets-gray-left-mainImage-element"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
