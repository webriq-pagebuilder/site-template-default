import React from "react";

function VariantC({ subtitle, title, faqs }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-xl mx-auto text-center">
            <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            <h1 className="text-5xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-wrap -mx-4 -mb-8">
            {faqs &&
              faqs.map((faq, index) => (
                <div className="w-full lg:w-1/2 px-4 mb-8" key={index}>
                  {faq.question && (
                    <div className="h-full p-8 bg-white rounded shadow">
                      <div className="mb-6 flex items-start">
                        <span className="mr-4 inline-block p-3 rounded-full bg-webriq-darkblue">
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
                        </span>
                        <h3 className="text-xl font-bold">{faq?.question}</h3>
                      </div>
                      <p className="text-gray-400 leading-loose">
                        {faq?.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
