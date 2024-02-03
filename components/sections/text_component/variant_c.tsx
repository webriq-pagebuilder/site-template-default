import React from "react";
import { PortableText } from "lib/sanity";
import { textComponentBlockStyling } from "./variant_a";
import { TextComponentProps } from ".";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantC({
  heading,
  firstColumn,
  secondColumn,
  thirdColumn,
}: TextComponentProps) {
  return (
    <section className="py-20">
      <Container className="container px-4 mx-auto">
        <Heading className="w-full mb-5 text-center">{heading}</Heading>
        <Flex wrap justify="center" className="mx-auto">
          {firstColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {secondColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={secondColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {thirdColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={thirdColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
        </Flex>
      </Container>
    </section>
  );
}
export default React.memo(VariantC);
