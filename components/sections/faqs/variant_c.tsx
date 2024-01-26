import React from "react";

import { FAQProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";

function VariantC({ subtitle, title, faqs }: FAQProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto mb-16 text-center">
            <span className="font-bold text-brand-primary">{subtitle}</span>
            <h1 className="text-5xl font-bold">{title}</h1>
          </div>
          {faqs && (
            <div className="flex flex-wrap -mx-4 -mb-8">
              {faqs?.map((faq, index) => (
                <div className="w-full px-4 mb-8 lg:w-1/2" key={index}>
                  {faq.question && (
                    <Card className="h-full p-8 ">
                      <div className="flex items-start mb-6">
                        <span className="inline-block p-3 mr-4 rounded-full bg-brand-primary">
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
                        <p className="text-xl font-bold">{faq?.question}</p>
                      </div>
                      <Text className="leading-loose " muted>
                        {faq?.answer}
                      </Text>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
