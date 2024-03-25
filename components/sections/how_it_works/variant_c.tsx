import React from "react";
import { HowItWorksProps } from ".";
import { Text, Heading, Card } from "components/ui";
import { Container, Flex } from "components/layout/index";

function VariantC({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={448} className="mb-8 text-center">
          {subtitle && (
            <Text weight="bold" className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Flex wrap justify="center">
          {steps &&
            steps?.map((step, index) => (
              <StepsItem step={step} index={index} key={step._key} />
            ))}
        </Flex>
      </Container>
    </section>
  );
}

function StepsItem({ index, step }) {
  return (
    <div className="w-full px-4 mt-8 md:w-1/2 lg:mb-0 lg:w-1/3" key={index}>
      <Card className="px-6 py-10 text-center ">
        <span className="inline-flex items-center justify-center w-16 h-16 mb-6 text-2xl font-bold rounded bg-secondary-foreground text-primary">
          {index + 1}
        </span>
        <Text weight="bold" className="mb-4 text-2xl">
          {step?.title}
        </Text>
        <Text muted className="leading-loose ">
          {step?.plainText}
        </Text>
      </Card>
    </div>
  );
}
export default React.memo(VariantC);
