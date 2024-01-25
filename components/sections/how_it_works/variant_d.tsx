import React from "react";

import { HowItWorksProps } from ".";
import { Text } from "components/ui/Text";

function VariantD({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="py-20 radius-for-skewed bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto mb-8 text-center">
            <span className="font-bold text-brand-primary">{subtitle}</span>
            <Text type="h1">{title}</Text>
          </div>
          {steps && (
            <div className="flex flex-wrap justify-center mx-10">
              {steps?.map((step, index) => (
                <div
                  className="relative w-full px-10 mt-20 md:w-1/2 lg:mb-0 lg:w-1/3"
                  key={index}
                >
                  <p
                    className="absolute top-0 left-0 ml-10 font-semibold -mt-14 text-9xl text-brand-primary opacity-20"
                    style={{ width: "69px", height: "103px" }}
                  >
                    {index + 1}
                  </p>
                  <p className="text-2xl font-bold">{step?.title}</p>
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
