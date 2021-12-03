import React from "react";

function VariantD({ subtitle, title, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md text-center mx-auto">
            <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
          </div>
          {steps && (
            <div className="relative flex flex-wrap mx-auto">
              {steps?.map((step, index) => (
                <div
                  className="mb-8 w-full lg:w-1/3 px-16 text-center"
                  key={step?._key}
                >
                  <span className="relative mb-6 lg:mb-10 mx-auto flex w-16 h-16 items-center justify-center bg-webriq-darkblue rounded-full text-white text-2xl z-10">
                    {index + 1}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold font-heading">
                    {step?.title}
                  </h3>
                  <p className="text-gray-500 leading-loose">{step?.content}</p>
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
