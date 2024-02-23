import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { LogoCloudProps } from ".";
import { Container, Flex } from "components/layout/index";

function VariantD({ images }: LogoCloudProps) {
  return (
    <section className="py-20">
      <Container>
        <Flex wrap justify="center" align="center">
          {images && images?.map((image, index) => <LogoItem image={image} />)}
        </Flex>
      </Container>
    </section>
  );
}

function LogoItem({ image }) {
  return (
    <div className="w-full px-2 mb-4 md:w-1/3 lg:mr-10 lg:w-1/6 xl:mr-0">
      {image?.image?.asset?._ref && (
        <Flex
          align="center"
          justify="center"
          className="mx-auto h-[192px] w-[192px]  rounded bg-gray-50"
        >
          <Image
            className="object-scale-down w-full h-full"
            src={urlFor(image?.image)}
            sizes="192px"
            width={192}
            height={192}
            alt={image?.alt ?? `logoCloud-image`}
          />
        </Flex>
      )}
    </div>
  );
}
export default React.memo(VariantD);
