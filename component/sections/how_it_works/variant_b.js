import React from "react";

function VariantB({ subtitle, title, text, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div className="max-w-md mx-20">
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
                <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
                <div className="max-w-xs">
                  <p className="text-gray-500 leading-loose">{text}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              {steps &&
                steps?.map((step, index) => (
                  <div
                    className="mb-12 lg:mb-8 lg:ml-10 flex flex-wrap items-start"
                    key={index}
                  >
                    <span className="mb-4 lg:mb-0 lg:mr-6 inline-flex items-center justify-center w-16 h-16 bg-webriq-lightblue rounded text-webriq-darkblue text-2xl font-bold">
                      {index + 1}
                    </span>
                    <div className="w-full lg:w-3/4">
                      <h3 className="mb-4 text-2xl font-bold font-heading">
                        {step?.title}
                      </h3>
                      <p className="text-gray-500 leading-loose">
                        {step?.content}
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
