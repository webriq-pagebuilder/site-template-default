import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { PortfolioProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { Text } from "components/ui/Text";

function VariantC({
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
              {title && <Text type="h1">{title}</Text>}
            </div>
            <div className="hidden mt-5 md:mt-0 lg:mt-0 lg:block xl:mt-0">
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
            {portfolios?.slice(0, portfolioLength)?.map((content, index) => (
              <div
                className="relative w-full px-4 mb-8 md:w-1/2 lg:w-1/3"
                key={index}
              >
                {content?.mainImage?.image && (
                  <div className="h-full overflow-hidden bg-white rounded">
                    <Image
                      className="h-[320px] w-[480px] object-cover"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="(min-width: 1540px) 480px, (min-width: 1280px) 395px, (min-width: 1040px) 309px, (min-width: 780px) 352px, (min-width: 560px) 480px, 88.33vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                    <div className="p-6">
                      <span className="text-gray-500">
                        {content?.dateAdded}
                      </span>
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {content?.title}
                      </p>
                      {content?.primaryButton?.label && (
                        <ConditionalLink
                          variant="link"
                          ariaLabel={content?.primaryButton?.label}
                          link={content?.primaryButton}
                          className="flex font-bold text-webriq-darkblue hover:text-webriq-blue"
                        >
                          {content?.primaryButton?.label}
                        </ConditionalLink>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="block mt-5 text-center md:mt-0 lg:mt-0 lg:hidden xl:mt-0">
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
      </div>
    </section>
  );
}

export default React.memo(VariantC);
