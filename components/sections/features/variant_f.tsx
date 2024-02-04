import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";
import { ConditionalLink } from "components/ui/ConditionalLink";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Button } from "components/ui/Button";

function VariantF({
  caption,
  title,
  description,
  images,
  primaryButton,
}: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex wrap align="center">
          <Flex direction="col" className="w-full mb-12 lg:mb-0 lg:w-1/2">
            <Container maxWidth={448} className="ml-0">
              <Text
                weight="bold"
                color="primary-brand"
                className="font-bold text-primary"
              >
                {caption}
              </Text>
              {title && <Heading className="mb-6">{title}</Heading>}
              {description && (
                <Text muted className="mb-6 leading-loose">
                  {description}
                </Text>
              )}
              {primaryButton?.label && (
                <Button
                  asLink
                  link={primaryButton}
                  ariaLabel={primaryButton?.label}
                >
                  {primaryButton?.label}
                </Button>
              )}
            </Container>
          </Flex>
          {images && (
            <div className="w-full lg:w-1/2">
              <div className="items-end mb-4 lg:flex lg:flex-wrap">
                <div className="h-full px-3 mb-4 lg:mb-0 lg:w-2/3">
                  {images?.[0]?.image && (
                    <div className="overflow-hidden rounded">
                      <Image
                        className="h-[269px] w-full object-cover"
                        src={urlFor(images[0]?.image)}
                        sizes="100vw"
                        width={356}
                        height={192}
                        alt={images[0]?.alt ?? "features-image-1"}
                      />
                    </div>
                  )}
                </div>
                <div className="h-full px-3 lg:w-1/3 ">
                  {images?.[1]?.image && (
                    <div className="overflow-hidden rounded">
                      <Image
                        className="object-cover w-full h-auto"
                        src={urlFor(images[1]?.image)}
                        sizes="100vw"
                        width={166}
                        height={128}
                        alt={images[1]?.alt ?? "features-image-2"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="items-start mb-4 lg:flex lg:flex-wrap ">
                <div className="h-full px-3 mb-4 lg:mb-0 lg:w-1/3">
                  {images?.[2]?.image && (
                    <div className="overflow-hidden rounded">
                      <Image
                        className="h-[269px] w-full object-cover lg:h-[126px]"
                        src={urlFor(images[2]?.image)}
                        width={166}
                        height={128}
                        sizes="100vw"
                        alt={images[2]?.alt ?? "features-image-3"}
                      />
                    </div>
                  )}
                </div>
                <div className="h-full px-3 lg:w-2/3">
                  {images?.[3]?.image && (
                    <div className="overflow-hidden rounded">
                      <Image
                        className="object-cover w-full h-auto"
                        src={urlFor(images[3]?.image)}
                        width={356}
                        height={192}
                        sizes="100vw"
                        alt={images[3]?.alt ?? "features-image-4"}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantF);
