import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { LogoCloudProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading } from "components/ui/Heading";

function VariantA({ title, images }: LogoCloudProps) {
  return (
    <section className="py-20">
      <Container>
        {title && (
          <Heading className="mb-12 text-2xl text-center lg:text-2xl">
            {title}
          </Heading>
        )}
        <Flex wrap justify="center" align="center">
          {images &&
            images?.map((image, index) => (
              <div
                className="w-full px-2 mb-4 md:w-1/3 lg:mr-10 lg:w-1/6 xl:mr-0"
                key={index}
              >
                {image?.image && (
                  <Flex
                    align="center"
                    justify="center"
                    className="mx-auto  h-[192px] w-[192px] rounded bg-gray-50"
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
                )}
              </div>
            ))}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantA);
