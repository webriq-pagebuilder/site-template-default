import React from "react";
import { HowItWorksProps } from ".";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";

function VariantC({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-8 text-center">
            <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            <Text type="h1">{title}</Text>
          </div>
          <div className="flex flex-wrap justify-center -mx-4">
            {steps &&
              steps?.map((step, index) => (
                <div
                  className="w-full px-4 mt-8 md:w-1/2 lg:mb-0 lg:w-1/3"
                  key={index}
                >
                  <Card className="px-6 py-10 text-center ">
                    <span className="inline-flex items-center justify-center w-16 h-16 mb-6 text-2xl font-bold rounded bg-webriq-lightblue text-webriq-darkblue">
                      {index + 1}
                    </span>
                    <p className="mb-4 text-2xl font-bold font-heading">
                      {step?.title}
                    </p>
                    <p className="leading-loose text-gray-500">
                      {step?.plainText}
                    </p>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
