import React from "react";
import { Text } from "components/ui/Text";

import { FAQProps } from ".";
import { Container } from "components/layout/Container";
import { Heading } from "components/ui/Heading";
import { Flex } from "components/layout/Flex/Flex";
import { Button } from "components/ui/Button";

function VariantB({ subtitle, title, faqsWithCategories }: FAQProps) {
  const [show, setShow] = React.useState(false);
  const [activeQA, setActiveQA] = React.useState(null);
  const [tabPane, setTabPane] = React.useState(
    faqsWithCategories?.[0]?.category
  );

  const updatedFAQArray = faqsWithCategories?.map((items) => ({
    ...items,
    askedQuestions: items?.askedQuestions?.map((item) => ({
      ...item,
      hidden: true,
    })),
  }));

  // toggle view or hide answers on click for each FAQ items
  const toggleView = (position: number) => {
    setActiveQA(position);
    setShow(!show);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="border-b">
        <Container maxWidth={576} className="mb-16 text-center ">
          {subtitle && (
            <Text weight="bold" className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading>{title}</Heading>}
        </Container>
        <Container maxWidth={768}>
          {updatedFAQArray && updatedFAQArray?.length > 0 && (
            <Flex wrap className="text-base text-center sm:text-md lg:text-xl">
              {updatedFAQArray?.map((tab, index) => (
                <Button
                  variant="unstyled"
                  as="button"
                  ariaLabel={tab?.category}
                  key={index}
                  onClick={() => setTabPane(tab?.category)}
                  className={`w-full  px-4 py-4 font-bold md:w-1/2 lg:w-auto ${
                    tabPane === tab?.category
                      ? " text-primary border-b-2 border-primary-foreground"
                      : "text-gray-500 transition duration-150 hover:border-primary-foreground hover:text-primary "
                  }`}
                >
                  {tab?.category}
                </Button>
              ))}
            </Flex>
          )}
        </Container>
      </div>
      <Container maxWidth={768}>
        <ul>
          {updatedFAQArray
            ?.find((item) => item?.category === tabPane)
            ?.askedQuestions?.map((content, index) => (
              <FAQItem
                index={index}
                show={show}
                toggleView={toggleView}
                content={content}
                activeQA={activeQA}
              />
            ))}
        </ul>
      </Container>
    </section>
  );
}

function FAQItem({ content, activeQA, show, index, toggleView }) {
  return (
    <li className="py-12 pr-4 border-b" key={index}>
      <Button
        as="button"
        variant="unstyled"
        ariaLabel={content?.question}
        className="flex items-center justify-between w-full font-bold text-left font-heading hover:text-gray-600 focus:outline-none"
        onClick={() => toggleView(index)}
      >
        <span className="w-3/4 text-xs lg:text-xl">{content?.question}</span>
        <ArrowIcon show={show} activeQA={activeQA} index={index} />
      </Button>
      {show && activeQA === index && (
        <Text muted className="mt-4 text-xs lg:text-xl">
          {content?.answer}
        </Text>
      )}
    </li>
  );
}

function ArrowIcon({ show, activeQA, index }) {
  return (
    <svg
      className="w-4 h-4 text-primary lg:h-6 lg:w-6 xl:h-6 xl:w-6 2xl:h-6 2xl:w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={
          show && activeQA === index
            ? "M5 10l7-7m0 0l7 7m-7-7v18"
            : "M19 14l-7 7m0 0l-7-7m7 7V3"
        }
      />
    </svg>
  );
}
export default React.memo(VariantB);
