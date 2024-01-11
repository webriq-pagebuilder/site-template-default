import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";
import { Text } from "components/ui/Text";

function VariantD({ caption, title, portfoliosWithCategory }: PortfolioProps) {
  let portfoliosPerPage = 6,
    count = 0; // default number of portfolios per category
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); // set the first index category as initial value

  // group portfolios per category
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto mb-8 text-center md:mb-16">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <Text type="h1" className="mb-6">
                {title}
              </Text>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap py-1 text-sm bg-white rounded">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={content?.category}
                    key={index}
                    onClick={() => setActiveTab(content?.category)}
                    className={`mx-auto mb-1 w-auto px-4 py-2 ${
                      activeTab === content?.category
                        ? "rounded bg-gray-50 font-bold text-webriq-darkblue shadow transition duration-200 focus:outline-none"
                        : "rounded font-bold text-gray-500 transition duration-200 hover:bg-webriq-lightblue hover:text-webriq-blue hover:shadow focus:outline-none"
                    }`}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mb-12 -mx-4 sm:flex">
            <div className="flex flex-wrap w-full mb-8 lg:mb-0 lg:w-1/2">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count, count + 2)
                ?.map((content) => (
                  <div
                    className="w-full px-4 mb-8 lg:w-1/2"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="object-cover w-full h-64"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={280}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 justify-center p-6 duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-80">
                          <div className="max-w-md my-auto text-xs">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white">
                              {content?.title}
                            </h1>
                            <div className="max-w-xs my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block px-6 py-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 2, count + 3)
                ?.map((content) => (
                  <div
                    className="w-full px-4 mb-8 lg:h-full lg:w-full lg:px-4 xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="object-cover w-full h-128"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 justify-center h-full p-6 duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-80">
                          <div className="max-w-md my-auto text-xs lg:mt-10 lg:text-sm xl:mt-10 xl:text-sm 2xl:mt-10 2xl:text-sm">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white lg:text-4xl xl:text-4xl 2xl:text-4xl">
                              {content?.title}
                            </h1>
                            <div className="max-w-sm my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block px-6 py-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="w-full lg:w-1/2">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 3, count + 4)
                ?.map((content) => (
                  <div
                    className="w-full px-4 mb-8 lg:w-full lg:px-4 xl:w-full xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="object-cover w-full h-128"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 justify-center h-full p-6 duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-80 ">
                          <div className="max-w-md my-auto text-xs lg:mt-10 lg:text-sm xl:mt-10 xl:text-sm 2xl:mt-10 2xl:text-sm">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white lg:text-4xl xl:text-4xl 2xl:text-4xl">
                              {content?.title}
                            </h1>
                            <div className="max-w-xs my-5">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block px-6 py-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              <div className="flex flex-wrap">
                {portfoliosPerCategory?.[0]?.content
                  ?.slice(count + 4, portfoliosPerPage)
                  ?.map((content) => (
                    <div
                      className="relative w-full px-4 mb-8 lg:mb-0 lg:w-1/2"
                      key={content?._key}
                    >
                      {content?.mainImage?.image && (
                        <div className="relative overflow-hidden rounded">
                          <Image
                            className="object-cover w-full h-64"
                            src={urlFor(content?.mainImage?.image)}
                            width={352}
                            height={280}
                            sizes="100vw"
                            alt={`portfolio-image${content?._key}`}
                          />
                          <div className="absolute inset-0 z-10 justify-center h-full p-6 duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-80 ">
                            <div className="max-w-md my-auto text-xs">
                              <span className="font-bold text-webriq-blue">
                                {content?.subtitle}
                              </span>
                              <h1 className="my-5 font-bold text-white">
                                {content?.title}
                              </h1>
                              <div className="max-w-xs my-5">
                                <p className="mb-6 text-gray-500">
                                  {content?.description}
                                </p>
                                {content?.primaryButton?.label && (
                                  <ConditionalLink
                                    ariaLabel={content?.primaryButton?.label}
                                    link={content?.primaryButton}
                                    className="inline-block px-6 py-2 font-bold leading-loose rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
                                  >
                                    {content?.primaryButton?.label}
                                  </ConditionalLink>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              <ConditionalLink
                ariaLabel={portfoliosPerCategory?.[0]?.primaryButton?.label}
                link={portfoliosPerCategory?.[0]?.primaryButton}
                className="inline-block px-6 py-2 font-bold leading-loose transition duration-200 outline-none rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50"
              >
                {portfoliosPerCategory?.[0]?.primaryButton?.label}
              </ConditionalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
