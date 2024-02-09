import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

function VariantH({ caption, title, features, images }: FeaturesProps) {
  return (
    <section className="py-20 radius-for-skewed bg-gray-50">
      <Container>
        <Flex wrap align="center">
          <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
            <Container maxWidth={448}>
              {caption && (
                <Text weight="bold" className="text-primary">
                  {caption}
                </Text>
              )}
              {title && <Heading className="mb-6">{title}</Heading>}
              <ul>
                {features &&
                  features?.length > 0 &&
                  features.map((feature) => {
                    return <FeatureItem feature={feature} key={feature._key} />;
                  })}
              </ul>
            </Container>
          </div>
          {images && (
            <div className="items-center w-full px-4 sm:flex md:px-0 lg:w-1/2">
              <div className="mb-5 sm:mb-0 sm:w-1/2">
                {images?.[0]?.image && (
                  <Image
                    className="object-cover overflow-hidden rounded-xl"
                    src={urlFor(images?.[0]?.image)}
                    width={640}
                    height={800}
                    sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                    alt={images?.[0]?.alt ?? "features-image-1"}
                  />
                )}
                {images?.[1]?.image && (
                  <Image
                    className="object-cover mt-6 overflow-hidden rounded-xl"
                    src={urlFor(images?.[1]?.image)}
                    width={640}
                    height={800}
                    sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                    alt={images?.[1]?.alt ?? "features-image-2"}
                  />
                )}
              </div>
              {images?.[2]?.image && (
                <Image
                  className="object-cover overflow-hidden rounded-xl sm:ml-6 sm:w-1/2"
                  src={urlFor(images?.[2]?.image)}
                  width={640}
                  height={800}
                  sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                  alt={images?.[2]?.alt ?? "features-image-3"}
                />
              )}
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantH);

function FeatureItem({ feature }) {
  return (
    <Flex as="li">
      <div>
        <svg
          className="w-8 h-8 mr-3 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </div>
      <div className="max-w-xs">
        <Text weight="bold">{feature?.title}</Text>
        <Text muted className="leading-loose ">
          {feature?.plainText}
        </Text>
      </div>
    </Flex>
  );
}
