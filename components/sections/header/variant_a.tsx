import { urlFor } from "lib/sanity";
import Image from "next/image";
import React from "react";

import {
  Section,
  Container,
  Flex,
  Heading,
  Button,
  Text
} from "@stackshift/components-library";

import { HeaderProps } from ".";

function VariantA({
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <Section className="py-20 bg-white" maxWidth="2xl">
      <Container>
        <Flex align="center" gap={4} className="flex-col lg:flex-row">
          <Flex align="center" direction="col" className="w-full basis-1/2">
            <Container maxWidth="md" className="mx-auto items-center text-center lg:text-left">
              {title && (
                <Heading className="mb-3" type="h1">
                  {title}
                </Heading>
              )}
              {description && (
                <Text className="my-6" muted>
                  {description}
                </Text>
              )}
              <Flex
                align="center"
                gap={2}
                className="flex items-center justify-center lg:justify-start gap-2 flex-col md:flex-row"
              >
                {primaryButton?.label && (
                  <Button ariaLabel={primaryButton?.ariaLabel} variant="outline">
                    {primaryButton?.label}
                  </Button>
                )}
                {secondaryButton?.label && (
                  <Button ariaLabel={secondaryButton?.ariaLabel} variant="ghost">
                    {secondaryButton?.label}
                  </Button>
                )}
              </Flex>              
            </Container>
          </Flex>
          {mainImage?.image && (
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
    </Section>
  );
}
export default React.memo(VariantA);
