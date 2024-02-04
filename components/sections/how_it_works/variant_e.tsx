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
        <Container maxWidth={448} className="mb-16 text-center ">
          <Text weight="bold" color="primary">
            {subtitle}
          </Text>
          <Heading>{title}</Heading>
        </Container>
        {steps && (
          <Flex wrap className="relative mx-auto">
            {steps?.map((step, index) => (
              <StepItem step={step} index={index} key={step._key} />
            ))}
          </Flex>
        )}
      </Container>
    </section>
  );
}

function StepItem({ step, index }) {
  return (
    <div className="w-full px-0 mb-8 text-center md:px-10 lg:w-1/3">
      <span className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl text-white rounded-full bg-primary lg:mb-10">
        {index + 1}
      </span>
      <Heading type="h3" classname="mb-4 text-2xl font-bold font-heading">
        {step?.title}
      </Heading>
      <Text muted className="leading-loose ">
        {step?.plainText}
      </Text>
    </div>
  );
}
export default React.memo(VariantD);
