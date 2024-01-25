import React from "react";

import { HowItWorksProps } from ".";
import { Text } from "components/ui/Text";

function VariantB({ subtitle, title, text, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
              <div className="max-w-md mx-20">
                <span className="font-bold text-brand-primary">{subtitle}</span>
                <Text type="h1" className="mb-2">
                  {title}
                </Text>
                <div className="max-w-xs">
                  <p className="leading-loose text-gray-500">{text}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              {steps &&
                steps?.map((step, index) => (
                  <div
                    className="flex flex-wrap items-start mb-12 lg:mb-8 lg:ml-10"
                    key={index}
                  >
                    <span className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded bg-brand-secondary-foreground text-brand-primary lg:mb-0 lg:mr-6">
                      {index + 1}
                    </span>
                    <div className="w-full lg:w-3/4">
                      <p className="mb-4 text-2xl font-bold font-heading">
                        {step?.title}
                      </p>
                      <p className="leading-loose text-gray-500">
                        {step?.plainText}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
