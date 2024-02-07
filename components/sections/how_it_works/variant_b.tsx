import React from "react";

import { HowItWorksProps } from ".";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

function VariantB({ subtitle, title, text, steps }: HowItWorksProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Flex align="center" justify="between" wrap>
          <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
            <Container maxWidth={448}>
              <Text weight="bold" className="text-primary">
                {subtitle}
              </Text>
              <Heading className="mb-2">{title}</Heading>

              <Text muted className="leading-loose">
                {text}
              </Text>
            </Container>
          </div>

          <div className="w-full lg:w-1/2">
            {steps &&
              steps?.map((step, index) => (
                <StepItem step={step} index={index} key={step._key} />
              ))}
          </div>
        </Flex>
      </Container>
    </section>
  );
}

function StepItem({ index, step }) {
  return (
    <Flex wrap align="start" className="mb-12 " key={index}>
      <span className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded bg-secondary-foreground text-primary lg:mb-0 lg:mr-6">
        {index + 1}
      </span>
      <div className="w-full lg:w-3/4">
        <Text weight="bold" className="mb-4 text-2xl">
          {step?.title}
        </Text>
        <Text className="leading-loose" muted>
          {step?.plainText}
        </Text>
      </div>
    </Flex>
  );
}
export default React.memo(VariantB);
