import React from "react";
import { PortableText } from "lib/sanity";
import { textComponentBlockStyling } from "./variant_a";
import { TextComponentProps } from ".";
import { Heading } from "components/ui/Heading";
import { Container, Flex } from "components/layout/index";

function VariantB({ heading, firstColumn, secondColumn }: TextComponentProps) {
  return (
    <section className="py-20">
      <Container>
        {heading && (
          <Heading className="w-full mb-4 text-center">{heading}</Heading>
        )}
        <Flex wrap justify="center" className="mx-auto ">
          {firstColumn && (
            <div className="px-5 mb-3 text-xs leading-relaxed text-justify text-gray-500 lg:mb-6 lg:w-1/4 lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {secondColumn && (
            <div className="px-5 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={secondColumn}
                components={textComponentBlockStyling}
                onMissingComponent={false} // Disabling warnings / handling unknown types
              />
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantB);
