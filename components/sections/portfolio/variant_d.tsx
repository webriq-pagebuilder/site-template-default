import { Container, Flex } from "components/layout/index";
import { Button, Heading } from "components/ui";
import { Text } from "components/ui/Text";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";
import { PortfolioProps } from ".";
import { useMediaQuery } from "hooks/useMediaQuery";

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
                  isActive={activeTab === content?.category}
                  ariaLabel={content?.category}
                  key={index}
                  onClick={() => setActiveTab(content?.category)}
                >
                  {content?.category}
                </Button>
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

function ProjectItem({ size, content }) {
  const breakpoints = useMediaQuery("639")
  const maxLength = breakpoints ? 60: 90;
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
              <Text className="text-sm text-primary" weight="bold">
                {content?.subtitle?.length > 26
                ? content?.subtitle?.substring(0, 26) + "..."
                : content?.subtitle}
              </Text>
              <Heading
                weight="bold"
                className={`my-5 text-white ${
                  size === "lg"
                    ? "text-sm md:text-4xl"
                    : "text-sm md:text-sm lg:text-sm"
                }`}
              >
                {content?.title?.length > 38
                ? content?.title?.substring(0, 38) + "..."
                : content?.title}
              </Heading>
              <div className="max-w-xs my-5">
                <Text fontSize="xs" muted className="mb-6 ">
                  {content?.description?.length > maxLength
                  ? content?.description?.substring(0, maxLength) + "..."
                  : content?.description}
                </Text>
                {content?.primaryButton?.label && (
                  <Button
                    as="link"
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
