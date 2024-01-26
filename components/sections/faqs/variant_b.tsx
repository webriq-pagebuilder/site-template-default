import React from "react";
import { Text } from "components/ui/Text";

import { FAQProps } from ".";

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
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="border-b">
          <div className="max-w-xl px-4 mx-auto mb-16 text-center">
            <span className="font-bold text-brand-primary">{subtitle}</span>
            <Text type="h1">{title}</Text>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap px-4 text-base text-center lg:-mx-4 lg:space-x-4 lg:text-xl">
              {updatedFAQArray?.map((tab, index) => (
                <button
                  aria-label={tab?.category}
                  key={index}
                  onClick={() => setTabPane(tab?.category)}
                  className={
                    tabPane === tab?.category
                      ? "w-full border-b-2 border-brand-primary-foreground px-4 py-4 font-bold text-brand-primary md:w-1/2 lg:w-auto"
                      : "w-full border-b-2 border-transparent px-4 py-4 font-bold text-gray-500 transition duration-150 hover:border-brand-primary-foreground hover:text-brand-primary md:w-1/2 lg:w-auto"
                  }
                >
                  {tab?.category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <ul>
              {updatedFAQArray
                ?.find((item) => item?.category === tabPane)
                ?.askedQuestions?.map((content, index) => (
                  <li className="py-12 pr-4 border-b" key={index}>
                    <button
                      aria-label={content?.question}
                      className="flex items-center justify-between w-full font-bold text-left font-heading hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleView(index)}
                    >
                      <span className="w-3/4 text-xs lg:text-xl xl:text-xl 2xl:text-xl">
                        {content?.question}
                      </span>
                      <svg
                        className="w-4 h-4 text-brand-primary lg:h-6 lg:w-6 xl:h-6 xl:w-6 2xl:h-6 2xl:w-6"
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
                    </button>
                    {show && activeQA === index && (
                      <p className="mt-4 text-xs font-normal leading-loose text-gray-500 lg:text-xl xl:text-xl 2xl:text-xl">
                        {content?.answer}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
