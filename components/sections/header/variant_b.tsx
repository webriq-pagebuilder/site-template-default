import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

import { HeaderProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading, Button, Text } from "components/ui";

function VariantB({
  template,
  images,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <section className="relative z-10 py-20 bg-gray-50">
      <Container>
        <Flex align="center" className="flex-col lg:flex-row" gap={4}>
          <Flex align="center" direction="col" className="w-full basis-1/2">
            <div className="max-w-md mx-auto">
              {title && <Heading className="mb-3">{title}</Heading>}
              {description && (
                <Text muted className="my-6">
                  {description}
                </Text>
              )}
              <Flex align="center" gap={2} className="flex-col md:flex-row">
                {primaryButton?.label && (
                  <Button link={primaryButton} ariaLabel={primaryButton?.label}>
                    {primaryButton?.label}
                  </Button>
                )}
                {secondaryButton?.label && (
                  <Button
                    link={secondaryButton}
                    className="text-black bg-white hover:bg-gray-50"
                    ariaLabel={secondaryButton?.label}
                  >
                    {secondaryButton?.label}
                  </Button>
                )}
              </Flex>
            </div>
          </Flex>
          {images && (
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-3 sm:flex lg:mb-4 lg:ml-6">
                {images?.[0]?.image && (
                  <Image
                    className="relative object-cover mb-3 mr-2 overflow-hidden rounded-xl sm:mb-0 sm:w-1/3 md:rounded-3xl lg:rounded-br-none"
                    sizes="100vw"
                    src={urlFor(images?.[0]?.image)}
                    width={941}
                    height={734}
                    alt={images?.[0]?.alt ?? "header-image-1"}
                  />
                )}
                {images?.[1]?.image && (
                  <Image
                    className="relative object-cover overflow-hidden rounded-xl sm:ml-2 sm:w-2/3 md:rounded-3xl lg:rounded-bl-none"
                    sizes="100vw"
                    src={urlFor(images?.[1]?.image)}
                    width={1050}
                    height={701}
                    alt={images?.[1]?.alt ?? "header-image-2"}
                  />
                )}
              </div>
              <div className="mb-3 sm:flex lg:mb-4 lg:mr-6">
                {images?.[2]?.image?.asset?._ref && (
                  <Image
                    className="object-cover mb-3 mr-2 overflow-hidden rounded-xl sm:w-2/3 md:mb-0 md:rounded-3xl lg:rounded-br-none"
                    sizes="100vw"
                    src={urlFor(images?.[2]?.image)}
                    width={1050}
                    height={701}
                    alt={images?.[2]?.alt ?? "header-image-3"}
                  />
                )}
                {images?.[3]?.image?.asset?._ref && (
                  <Image
                    className="object-cover overflow-hidden rounded-xl sm:ml-2 sm:w-1/3 md:rounded-3xl lg:rounded-bl-none"
                    sizes="100vw"
                    src={urlFor(images?.[3]?.image)}
                    width={941}
                    height={734}
                    alt={images?.[3]?.alt ?? "header-image-4"}
                  />
                )}
              </div>
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantB);
