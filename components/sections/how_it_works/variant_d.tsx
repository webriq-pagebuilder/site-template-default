import React from "react";

import { HowItWorksProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantD({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={448} className="mb-8 text-center">
          <Text
            weight="bold"
            color="brand-primary"
            className="font-bold text-brand-primary"
          >
            {subtitle}
          </Text>
          <Heading>{title}</Heading>
        </Container>
        {steps && (
          <Flex wrap justify="center">
            {steps?.map((step, index) => (
              <StepItem step={step} index={index} key={step._key} />
            ))}
          </Flex>
        )}
      </Container>
    </section>
  );
}

function StepItem({ index, step }) {
  return (
    <div
      className="relative w-full mt-20 md:w-1/2 lg:mb-0 lg:w-1/3"
      key={index}
    >
      <p
        className="absolute top-0 left-0 ml-10 font-semibold -mt-14 text-9xl text-brand-primary opacity-20"
        style={{ width: "69px", height: "103px" }}
      >
        {index + 1}
      </p>
      <Text weight="bold" className="text-2xl">
        {step?.title}
      </Text>
      <Text muted className="leading-loose ">
        {step?.plainText}
      </Text>
    </div>
  );
}
export default React.memo(VariantD);
