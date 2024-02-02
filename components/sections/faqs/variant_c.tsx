import React from "react";

import { FAQProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";

function VariantC({ subtitle, title, faqs }: FAQProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="mb-16 text-center">
          <Text weight="bold" color="brand-primary">
            {subtitle}
          </Text>
          <Heading>{title}</Heading>
        </Container>

        {faqs && (
          <Flex wrap>{faqs?.map((faq, index) => <FAQItem faq={faq} />)}</Flex>
        )}
      </Container>
    </section>
  );
}

function FAQItem({ faq }) {
  return (
    <div className="w-full px-4 mb-8 lg:w-1/2">
      {faq.question && (
        <Card className="h-full p-8 ">
          <Flex align="start" className="mb-6">
            <span className="inline-block p-3 mr-4 rounded-full bg-brand-primary">
              <QuoteIcon />
            </span>
            <Text weight="bold" className="text-xl">
              {faq?.question}
            </Text>
          </Flex>
          <Text className="leading-loose " muted>
            {faq?.answer}
          </Text>
        </Card>
      )}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
}
export default React.memo(VariantC);
