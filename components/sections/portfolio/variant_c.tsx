import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { PortfolioProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Button } from "components/ui/Button";

function VariantC({
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
          <div className="hidden mt-5 md:mt-0 lg:block ">
            {primaryButton?.label && (
              <Button
                asLink
                ariaLabel={primaryButton?.label}
                link={primaryButton}
              >
                {primaryButton?.label}
              </Button>
            )}
          </div>
        </Flex>
        <Flex wrap className="mb-4 ">
          {portfolios
            ?.slice(0, portfolioLength)
            ?.map((content, index) => (
              <ProjectItem content={content} key={content._key} />
            ))}
        </Flex>
        <div className="block mt-5 text-center md:mt-0 lg:hidden">
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

export default React.memo(VariantC);

function ProjectItem({ content }) {
  return (
    <div className="relative w-full px-4 mb-8 md:w-1/2 lg:w-1/3">
      {content?.mainImage?.image && (
        <div className="h-full overflow-hidden bg-white rounded">
          <Image
            className="h-[320px] w-[480px] object-cover"
            src={urlFor(content?.mainImage?.image)}
            width={480}
            height={320}
            sizes="(min-width: 1540px) 480px, (min-width: 1280px) 395px, (min-width: 1040px) 309px, (min-width: 780px) 352px, (min-width: 560px) 480px, 88.33vw"
            alt={content?.mainImage?.alt ?? `portfolio-image`}
          />
          <div className="p-6">
            <Text muted>{content?.dateAdded}</Text>
            <Text weight="bold" fontSize="2xl" className="mb-4 ">
              {content?.title}
            </Text>
            {content?.primaryButton?.label && (
              <Button
                asLink
                variant="link"
                ariaLabel={content?.primaryButton?.label}
                link={content?.primaryButton}
                className="font-bold no-underline"
              >
                {content?.primaryButton?.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
