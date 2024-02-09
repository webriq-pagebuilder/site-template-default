import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { AppPromoProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

function VariantC({
  subtitle,
  title,
  description,
  features,
  images,
}: AppPromoProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex align="center" wrap gap={8}>
          <div className="max-w-xl space-y-5">
            {subtitle && (
              <Text
                weight="bold"
                className="text-sm md:text-lg lg:text-xl text-primary"
              >
                {subtitle}
              </Text>
            )}
            {title && <Heading>{title}</Heading>}
            {description && (
              <Text muted className="text-sm md:text-lg lg:text-xl">
                {description}
              </Text>
            )}
            <ul className="mb-8 ">
              {features &&
                features.map((feature, index) => (
                  <Flex as="li" align="center" className="mb-3" key={index}>
                    <CheckIcon />
                    <Text
                      className="text-sm md:text-lg lg:text-xl"
                      weight="bold"
                      muted
                    >
                      {feature}
                    </Text>
                  </Flex>
                ))}
            </ul>
          </div>
          <Flex align="center" className="w-full transform -rotate-12 lg:w-1/2">
            <div className="w-full">
              {images?.[0]?.image && (
                <Image
                  className="object-cover"
                  src={urlFor(images[0]?.image)}
                  sizes="100vw"
                  width={500}
                  height={850}
                  alt={images[0]?.alt ?? "appPromo-variantC-image1"}
                />
              )}
            </div>
            <div className="w-full">
              {images
                ?.slice(1, 3)
                ?.map((images, index) => (
                  <Image
                    className="object-cover"
                    src={urlFor(images?.image)}
                    sizes="100vw"
                    width={500}
                    height={850}
                    alt={images[1]?.alt ?? `appPromo-variantC-image${index}`}
                    key={index}
                  />
                ))}
            </div>
            <div className="w-full">
              {images?.[3]?.image && (
                <Image
                  className="object-cover"
                  src={urlFor(images[3]?.image)}
                  sizes="100vw"
                  width={500}
                  height={850}
                  alt={images[3]?.alt ?? "appPromo-variantC-image4"}
                />
              )}
            </div>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 mr-2 text-primary-foreground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default React.memo(VariantC);
