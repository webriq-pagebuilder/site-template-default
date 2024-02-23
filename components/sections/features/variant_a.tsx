import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

import { FeaturesProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading, Text } from "components/ui";

function VariantA({ caption, title, features }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={448} className="mb-16 text-center ">
          {caption && (
            <Text weight="bold" className="text-primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap>
          {features &&
            features?.map((feature, index) => {
              return <FeatureItem feature={feature} key={feature._key} />;
            })}
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantA);

function FeatureItem({ feature }) {
  return (
    <div className="w-full px-4 mt-16 mb-12 md:w-1/2 lg:mb-0 lg:w-1/4">
      <span className="inline-block p-3 mb-4 rounded bg-secondary-foreground text-primary-foreground md:mb-6">
        {feature?.mainImage?.image && (
          <Image
            className="object-scale-down"
            src={urlFor(feature?.mainImage?.image)}
            width={40}
            height={40}
            alt={feature?.mainImage?.alt ?? `features-image-`}
          />
        )}
      </span>

      {feature?.title && (
        <Text weight="bold" className="mb-4 text-2xl">
          {feature?.title}
        </Text>
      )}
      {feature?.plainText && (
        <Text muted className="leading-loose">
          {feature?.plainText}
        </Text>
      )}
    </div>
  );
}
