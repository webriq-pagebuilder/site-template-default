import React from "react";

import { FAQProps } from ".";

function VariantB({ subtitle, title, faqsWithCategories }: FAQProps) {
  const [view, setView] = React.useState([]);
  const [tabPane, setTabPane] = React.useState(
    faqsWithCategories?.[0]?.category
  );

  React.useEffect(() => {
    let tempFaqs = [];
    faqsWithCategories &&
      faqsWithCategories?.map(faqs => {
        faqs?.askedQuestions?.map(items =>
          tempFaqs.push({
            category: faqs?.category,
            question: items?.question,
            answer: items?.answer,
            hidden: true,
          })
        );
      });
    setView(tempFaqs);
  }, [faqsWithCategories]);

  const toggleView = position => {
    let newFaq = [...view];
    newFaq[position].hidden = !view[position].hidden;
    setView(newFaq);
  };

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="border-b">
          <div className="mx-auto mb-16 max-w-xl px-4 text-center">
            <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            <h1 className="font-heading text-4xl font-bold lg:text-5xl">
              {title}
            </h1>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap px-4 text-center text-base lg:-mx-4 lg:space-x-4 lg:text-xl">
              {faqsWithCategories?.map((tab, index) => (
                <button
                  aria-label={`Frequently Asked Questions ${tab?.category} tab`}
                  key={index}
                  onClick={() => setTabPane(tab?.category)}
                  className={
                    tabPane === tab?.category
                      ? "w-full border-b-2 border-webriq-blue px-4 py-4 font-bold text-webriq-darkblue md:w-1/2 lg:w-auto"
                      : "w-full border-b-2 border-transparent px-4 py-4 font-bold text-gray-500 transition duration-150 hover:border-webriq-blue hover:text-webriq-darkblue md:w-1/2 lg:w-auto"
                  }
                >
                  {tab?.category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <ul>
              {view
                ?.filter(items => items?.category === tabPane)
                ?.map((content, index) => (
                  <li className="border-b py-12 pr-4" key={index}>
                    <button
                      aria-label={`Show Question-${index} Answer`}
                      className="font-heading flex w-full items-center justify-between text-left font-bold hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleView(index)}
                    >
                      <span className="w-3/4 text-xs lg:text-xl xl:text-xl 2xl:text-xl">
                        {content?.question}
                      </span>
                      <svg
                        className="h-4 w-4 text-webriq-darkblue lg:h-6 lg:w-6 xl:h-6 xl:w-6 2xl:h-6 2xl:w-6"
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
                            view[index].hidden === false
                              ? "M5 10l7-7m0 0l7 7m-7-7v18"
                              : "M19 14l-7 7m0 0l-7-7m7 7V3"
                          }
                        />
                      </svg>
                    </button>
                    {view[index].hidden === false && (
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
