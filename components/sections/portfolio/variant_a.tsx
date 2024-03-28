import { Container, Flex } from "components/layout/index";
import { Button, Heading, Text } from "components/ui";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";
import { PortfolioProps } from ".";

function VariantA({ caption, title, portfoliosWithCategory }: PortfolioProps) {
  let portfolioLength = 8; //set initial number of portfolios to display for this variant
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); //set the first index category as initial value

  //creates new array of items filtered by active tab
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={512} className="mb-8 text-center md:mb-16">
          {caption && (
            <Text weight="bold" className="text-primary">
              {caption}
            </Text>
          )}
          {title && <Heading className="mb-6">{title}</Heading>}
          {portfoliosWithCategory && (
            <div className="inline-flex flex-wrap py-1 text-sm bg-white rounded">
              {portfoliosWithCategory?.map((content, index) => (
                <Button
                  variant="tab"
                  as="button"
                  ariaLabel={content?.category}
                  key={index}
                  isActive={activeTab === content?.category}
                  onClick={() => setActiveTab(content?.category)}
                >
                  {content?.category}
                </Button>
              ))}
            </div>
          )}
        </Container>
        {portfoliosPerCategory?.[0]?.content && (
          <Flex wrap className="mb-8">
            {portfoliosPerCategory?.[0]?.content
              ?.slice(0, portfolioLength)
              ?.map((content, index) => (
                <div
                  className="w-full flex space-x-5 px-4 mb-8 sm:w-1/2 lg:w-1/4 "
                  key={index}
                >
                  <div className="relative mx-auto h-[256px] w-[332px] overflow-hidden rounded-lg">
                    {content?.mainImage?.image && (
                      <Image
                      className="object-cover w-full h-full"
                      src={urlFor(content?.mainImage?.image)}
                      sizes="100vw"
                      width={332}
                        height={256}
                        alt={
                          content?.mainImage?.alt ?? `portfolio-image${index}`
                        }
                      />
                    )}
                    <div className="absolute inset-0 z-10 flex items-center justify-center duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-75">
                      {content?.primaryButton?.label && (
                        <Button
                          as="link"
                          variant="outline"
                          ariaLabel={content?.primaryButton?.label}
                          link={content?.primaryButton}
                          className="bg-transparent border-secondary-foreground outline text-white hover:bg-secondary-foreground/20 hover:border-secondary-foreground/20 inline-block rounded-l-xl rounded-t-xl font-bold transition duration-200 px-3 py-4"
                        >
                          {content?.primaryButton?.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </Flex>
        )}
        {portfoliosPerCategory?.[0]?.primaryButton?.label && (
          <div className="text-center">
            <Button
              as="link"
              ariaLabel={portfoliosPerCategory?.[0]?.primaryButton?.label}
              link={portfoliosPerCategory?.[0]?.primaryButton}
            >
              {portfoliosPerCategory?.[0]?.primaryButton?.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default React.memo(VariantA);
