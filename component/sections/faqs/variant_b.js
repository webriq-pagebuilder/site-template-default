import React from "react";

function VariantB({ subtitle, title, faqsWithCategories }) {
  const [view, setView] = React.useState([]);
  const [tabPane, setTabPane] = React.useState(
    faqsWithCategories?.[0]?.category
  );

  React.useState(() => {
    faqsWithCategories?.map((faqs) => {
      faqs?.askedQuestions?.map((items) =>
        setView((prevState) => [
          ...prevState,
          {
            category: faqs?.category,
            question: items?.question,
            answer: items?.answer,
            hidden: true,
          },
        ])
      );
    });
  }, []);

  const toggleView = (position) => {
    let newFaq = [...view];
    newFaq[position].hidden = !view[position].hidden;
    setView(newFaq);
  };

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="border-b">
          <div className="mb-16 max-w-xl mx-auto px-4 text-center">
            <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap px-4 text-center lg:-mx-4 lg:space-x-4 text-base lg:text-xl">
              {faqsWithCategories?.map((tab, index) => (
                <button
                  aria-label={`Frequently Asked Questions ${tab?.category} tab`}
                  key={index}
                  onClick={() => setTabPane(tab?.category)}
                  className={
                    tabPane === tab?.category
                      ? "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-webriq-darkblue border-b-2 border-webriq-blue"
                      : "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-gray-400 hover:text-webriq-darkblue border-b-2 border-transparent hover:border-webriq-blue transition duration-150"
                  }
                >
                  {tab?.category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ul>
              {view
                ?.filter((items) => items?.category === tabPane)
                ?.map((content, index) => (
                  <li className="py-12 pr-4 border-b" key={index}>
                    <button
                      aria-label={`Show Question-${index} Answer`}
                      className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600"
                      onClick={() => toggleView(index)}
                    >
                      <span className="text-xl">{content?.question}</span>
                      <svg
                        className="w-4 h-4 text-webriq-darkblue"
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
                      <p className="mt-4 text-gray-400 font-normal leading-loose">
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
