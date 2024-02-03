import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";
import { Button } from "components/ui/Button";

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
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={512} className="mb-8 text-center md:mb-16">
          {caption && (
            <Text weight="bold" color="brand-primary">
              {caption}
            </Text>
          )}
          {title && <Heading className="mb-6">{title}</Heading>}
          {portfoliosWithCategory && (
            <div className="inline-flex flex-wrap py-1 text-sm bg-white rounded">
              {portfoliosWithCategory?.map((content, index) => (
                <button
                  aria-label={content?.category}
                  key={index}
                  onClick={() => setActiveTab(content?.category)}
                  className={`mx-auto mb-1 w-auto px-4 py-2 ${
                    activeTab === content?.category
                      ? "rounded bg-gray-50 font-bold text-brand-primary shadow transition duration-200 focus:outline-none"
                      : "rounded font-bold text-gray-500 transition duration-200 hover:bg-brand-secondary-foreground hover:text-brand-primary-foreground hover:shadow focus:outline-none"
                  }`}
                >
                  {content?.category}
                </button>
              ))}
            </div>
          )}
        </Container>
        <div className="mb-12 sm:flex">
          <Flex wrap className="w-full mb-8 lg:mb-0 lg:w-1/2">
            {portfoliosPerCategory?.[0]?.content
              ?.slice(count, count + 2)
              ?.map((content) => (
                <ProjectItem size={"sm"} content={content} key={content._key} />
              ))}
            {portfoliosPerCategory?.[0]?.content
              ?.slice(count + 2, count + 3)
              ?.map((content) => (
                <ProjectItem size={"lg"} content={content} key={content._key} />
              ))}
          </Flex>
          <div className="w-full lg:w-1/2">
            {portfoliosPerCategory?.[0]?.content
              ?.slice(count + 3, count + 4)
              ?.map((content) => (
                <ProjectItem size={"lg"} content={content} key={content._key} />
              ))}
            <div className="flex flex-wrap">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 4, portfoliosPerPage)
                ?.map((content) => (
                  <ProjectItem
                    size={"sm"}
                    content={content}
                    key={content._key}
                  />
                ))}
            </div>
          </div>
        </div>
        {portfoliosPerCategory?.[0]?.primaryButton?.label && (
          <div className="text-center">
            <Button
              asLink
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

function ProjectItem({ size, content }) {
  return (
    <div
      className={`w-full px-4 mb-8 ${size === "lg" ? "w-full" : "lg:w-1/2"}`}
    >
      {content?.mainImage?.image && (
        <div className="relative overflow-hidden rounded">
          <Image
            className={`"object-cover w-full ${
              size === "lg" ? "h-128" : "h-64"
            }`}
            src={urlFor(content?.mainImage?.image)}
            sizes="100vw"
            width={352}
            height={280}
            alt={`portfolio-image-${content?._key}`}
          />
          <div className="absolute inset-0 z-10 justify-center p-6 duration-300 bg-gray-900 rounded-lg opacity-0 hover:opacity-80">
            <div className="max-w-md my-auto text-xs">
              <Text className="text-sm" weight="bold" color="brand-primary">
                {content?.subtitle}
              </Text>
              <Heading
                weight="bold"
                className={`my-5 text-white ${
                  size === "lg"
                    ? "md:text-4xl"
                    : "text-sm md:text-sm lg:text-sm"
                }`}
              >
                {content?.title}
              </Heading>
              <div className="max-w-xs my-5">
                <Text muted className="mb-6 text-xs">
                  {content?.description}
                </Text>
                {content?.primaryButton?.label && (
                  <Button
                    asLink
                    ariaLabel={content?.primaryButton?.label}
                    link={content?.primaryButton}
                  >
                    {content?.primaryButton?.label}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(VariantD);
