import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

import { HeaderProps } from ".";

import { Container, Flex } from "components/layout/index";
import { Text, Button, Heading } from "components/ui";

function VariantD({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      <Container>
        <Flex align="center" className="flex-col lg:flex-row" gap={4}>
          <Flex align="center" direction="col" className="w-full ">
            <div className="max-w-md mx-auto text-center lg:text-left">
              {title && <Heading className="mb-3">{title}</Heading>}
              {description && (
                <Text muted className="my-6">
                  {description}
                </Text>
              )}
              <Flex
                align="center"
                gap={2}
                className="flex items-center justify-center lg:justify-start gap-2 flex-col md:flex-row"
              >
                {primaryButton?.label && (
                  <Button
                    as="link"
                    link={primaryButton}
                    ariaLabel={primaryButton?.label}
                  >
                    {primaryButton?.label}
                  </Button>
                )}
                {secondaryButton?.label && (
                  <Button
                    as="link"
                    link={secondaryButton}
                    className="text-black bg-white hover:bg-gray-50 inline-block rounded-l-xl rounded-t-xl font-bold transition duration-200 px-6 py-3"
                    ariaLabel={secondaryButton?.label}
                  >
                    {secondaryButton?.label}
                  </Button>
                )}
              </Flex>
            </div>
          </Flex>

          {mainImage?.image?.asset?._ref && (
            <div className="w-full h-full">
              <Image
                src={urlFor(mainImage?.image)}
                width={1050}
                height={700}
                sizes="100vw"
                style={{ objectFit: "contain" }}
                alt={mainImage?.alt ?? "header-main-image"}
              />
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}

export default React.memo(VariantD);
