import React from "react";
import { PortableText } from "lib/sanity";
import { textComponentBlockStyling } from "./variant_a";
import { TextComponentProps } from ".";
import { Container, Flex } from "components/layout/index";
import { Heading } from "components/ui/Heading";

function VariantC({
  heading,
  firstColumn,
  secondColumn,
  thirdColumn,
}: TextComponentProps) {
  return (
    <section className="py-20">
      <Container className="container px-4 mx-auto">
        {heading && (
          <Heading className="w-full mb-5 text-center">{heading}</Heading>
        )}
        <Flex wrap justify="center" className="mx-auto">
          {firstColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
                onMissingComponent={false} // Disabling warnings / handling unknown types
              />
            </div>
          )}
          {secondColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={secondColumn}
                components={textComponentBlockStyling}
                onMissingComponent={false} // Disabling warnings / handling unknown types
              />
            </div>
          )}
          {thirdColumn && (
            <div className="px-3 mb-6 text-xs leading-relaxed text-justify text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={thirdColumn}
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
export default React.memo(VariantC);
