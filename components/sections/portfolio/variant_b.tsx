import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { PortfolioProps } from ".";
import { Text } from "components/ui/Text";
import { Container, Flex } from "components/layout/index";
import { Heading, Button } from "components/ui";

function VariantB({
  caption,
  title,
  portfolios,
  primaryButton,
}: PortfolioProps) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex
          wrap
          align="center"
          justify="center"
          className="mb-16 md:justify-between"
        >
          <div className="text-center lg:text-left">
            {caption && (
              <Text weight="bold" className="text-primary">
                {caption}
              </Text>
            )}
            {title && <Heading>{title}</Heading>}
          </div>
          <div className="hidden mt-5 text-right md:mt-0 lg:mt-0 lg:block xl:mt-0">
            {primaryButton?.label && (
              <Button ariaLabel={primaryButton?.label} link={primaryButton}>
                {primaryButton?.label}
              </Button>
            )}
          </div>
        </Flex>
        {portfolios && portfolios?.length > 0 && (
          <Flex wrap className="mb-4 ">
            {portfolios
              ?.slice(0, portfolioLength)
              .map((content, index) => (
                <ProjectItem content={content} key={content._key} />
              ))}
          </Flex>
        )}
        <div className="block mt-5 text-center md:mt-0 lg:mt-0 lg:hidden xl:mt-0">
          {primaryButton?.label && (
            <Button ariaLabel={primaryButton?.label} link={primaryButton}>
              {primaryButton?.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

function ProjectItem({ content }) {
  return (
    <div className="w-full px-4 mb-4 md:w-1/2 lg:w-1/3">
      <div className="relative mx-auto overflow-hidden rounded md:mb-5">
        {content?.mainImage?.image && (
          <Image
            className="object-cover w-full h-80"
            src={urlFor(content?.mainImage?.image)}
            width={480}
            height={320}
            sizes="100vw"
            alt={content?.mainImage?.alt ?? `portfolio-image`}
          />
        )}

        <Flex
          direction="col"
          align="start"
          className="absolute inset-0 z-10 items-start p-6 duration-300 bg-gray-900 rounded opacity-0 hover:opacity-75"
        >
          <Text className="text-secondary-foreground">
            {content?.dateAdded}
          </Text>
          <Text
            weight="bold"
            className="mb-auto text-white md:text-xl lg:text-2xl"
          >
            {content?.title}
          </Text>
          {content?.primaryButton?.label && (
            <Button
              variant="outline"
              ariaLabel={content?.primaryButton?.label}
              link={content?.primaryButton}
              className="bg-transparent !outline-none border-2 border-gray-400 hover:border-primary text-gray-50 hover:bg-primary hover:text-white "
            >
              {content?.primaryButton?.label}
            </Button>
          )}
        </Flex>
      </div>
    </div>
  );
}

export default React.memo(VariantB);
