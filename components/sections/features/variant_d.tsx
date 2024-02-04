import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantD({ caption, title, features }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={448} className="mb-8 text-center ">
          {caption && (
            <Text weight="bold" className="text-primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap justify="center">
          {features.map((feature, index) => (
            <FeatureItem feature={feature} key={feature._key} />
          ))}
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantD);

function FeatureItem({ feature }) {
  return (
    <div className="w-full px-4 mt-8 lg:mb-0 lg:w-1/3">
      <Card className="h-full px-6 py-12 text-center">
        <div className="self-start inline-block p-3 mb-6 rounded-lg bg-secondary-foreground md:p-5">
          {feature?.mainImage?.image?.asset?._ref && (
            <Image
              className="object-scale-down"
              src={urlFor(feature?.mainImage?.image)}
              width={40}
              height={40}
              alt={feature?.mainImage?.alt ?? `features-image-`}
            />
          )}
        </div>
        <Text weight="bold" className="px-8 mb-4 text-2xl ">
          {feature?.title}
        </Text>
        <Text muted>{feature?.plainText}</Text>
      </Card>
    </div>
  );
}
