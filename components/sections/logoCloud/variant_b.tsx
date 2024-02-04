import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { LogoCloudProps } from ".";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";

function VariantB({ title, text, images }: LogoCloudProps) {
  return (
    <section className="py-20">
      <Container>
        <Flex wrap align="center" justify="between">
          <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
            <Container maxWidth={448}>
              <Heading weight="bold" className="mb-4">
                {title}
              </Heading>
              <Text muted className="leading-loose">
                {text}
              </Text>
            </Container>
          </div>
          <Flex wrap className="w-full lg:w-1/2">
            {images &&
              images?.map((image, index) => (
                <div className="w-full px-2 mb-4 sm:w-1/2 md:w-1/3" key={index}>
                  {image?.image?.asset?._ref && (
                    <div>
                      <Flex
                        align="center"
                        justify="center"
                        className="mx-auto h-[192px] w-[192px] rounded bg-gray-50"
                      >
                        <Image
                          className="object-scale-down"
                          src={urlFor(image?.image)}
                          sizes="192px"
                          width={192}
                          height={192}
                          alt={image?.alt ?? `logoCloud-image${index}`}
                        />
                      </Flex>
                    </div>
                  )}
                </div>
              ))}
          </Flex>
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
