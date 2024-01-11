import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { PortfolioProps } from ".";
import { Text } from "components/ui/Text";

function VariantB({
  caption,
  title,
  portfolios,
  primaryButton,
}: PortfolioProps) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center mb-16 md:justify-between">
            <div className="text-center lg:text-left">
              {caption && (
                <span className="font-bold text-webriq-darkblue">
                  {caption}
                </span>
              )}
              {title && (
                <Text type="h1" className="">
                  {title}
                </Text>
              )}
            </div>
            <div className="hidden mt-5 text-right md:mt-0 lg:mt-0 lg:block xl:mt-0">
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mb-4 -mx-4">
            {portfolios?.slice(0, portfolioLength).map((content, index) => (
              <div
                className="relative w-full px-4 mb-4 md:w-1/2 lg:w-1/3"
                key={index}
              >
                <div className="relative mx-auto overflow-hidden rounded md:mb-5 lg:mb-5 xl:mb-5">
                  {content?.mainImage?.image && (
                    <Image
                      className="object-cover w-full h-80"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="100vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                  )}

                  <div className="absolute inset-0 z-10 flex flex-col items-start p-6 duration-300 bg-gray-900 rounded opacity-0 hover:opacity-75">
                    <span className="text-webriq-lightblue">
                      {content?.dateAdded}
                    </span>
                    <p className="mb-auto font-bold text-white md:text-xl lg:text-2xl">
                      {content?.title}
                    </p>
                    {content?.primaryButton?.label && (
                      <ConditionalLink
                        variant="outline"
                        ariaLabel={content?.primaryButton?.label}
                        link={content?.primaryButton}
                        className="bg-transparent !outline-none border-2 border-gray-400 hover:border-webriq-darkblue text-gray-50 hover:bg-webriq-darkblue hover:text-white "
                      >
                        {content?.primaryButton?.label}
                      </ConditionalLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="block mt-5 text-center md:mt-0 lg:mt-0 lg:hidden xl:mt-0">
            {primaryButton?.label && (
              <ConditionalLink
                ariaLabel={primaryButton?.label}
                link={primaryButton}
                className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
              >
                {primaryButton?.label}
              </ConditionalLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
