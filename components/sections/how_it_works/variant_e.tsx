import React from "react";
import { HowItWorksProps } from ".";
import { Text } from "components/ui/Text";

function VariantD({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-16 text-center">
            <span className="font-bold text-brand-primary">{subtitle}</span>
            <Text type="h1">{title}</Text>
          </div>
          {steps && (
            <div className="relative flex flex-wrap mx-auto">
              {steps?.map((step, index) => (
                <div
                  className="w-full px-16 mb-8 text-center lg:w-1/3"
                  key={step?._key}
                >
                  <span className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-6 text-2xl text-white rounded-full bg-brand-primary lg:mb-10">
                    {index + 1}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold font-heading">
                    {step?.title}
                  </h3>
                  <p className="leading-loose text-gray-500">
                    {step?.plainText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
