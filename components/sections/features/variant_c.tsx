import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";

function VariantC({ caption, title, features }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={448} className="mb-16 text-center ">
          {caption && (
            <Text weight="bold" color="primary">
              {caption}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <div className="flex flex-wrap justify-start -mx-3">
          {features &&
            features.map((feature, index) => {
              return <FeatureItem feature={feature} key={feature._key} />;
            })}
        </div>
      </Container>
    </section>
  );
}

export default React.memo(VariantC);

function FeatureItem({ feature }) {
  return (
    <div className="w-full px-3 mb-6 lg:w-1/2">
      <Card className="flex flex-wrap h-full p-6">
        <div className="self-start inline-block p-3 mb-4 mr-6 rounded-lg bg-secondary-foreground md:p-5 lg:mb-0">
          {feature?.mainImage?.image && (
            <Image
              className="object-scale-down"
              src={urlFor(feature?.mainImage?.image)}
              width={40}
              height={40}
              alt={feature?.mainImage?.alt ?? "features-main-image"}
            />
          )}
        </div>
        <div className="w-full lg:w-2/3">
          <Text weight="bold" className="mb-2 text-2xl ">
            {feature?.title}
          </Text>
          <Text muted>{feature?.plainText}</Text>
        </div>
      </Card>
    </div>
  );
}
