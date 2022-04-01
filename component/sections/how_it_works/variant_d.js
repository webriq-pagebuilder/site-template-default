import React from "react";

function VariantD({ subtitle, title, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-md text-center mx-auto">
            <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h1>
          </div>
          {steps && (
            <div className="flex flex-wrap mx-10 justify-center">
              {steps?.map((step, index) => (
                <div
                  className="mt-20 lg:mb-0 relative w-full md:w-1/2 lg:w-1/3 px-10"
                  key={index}
                >
                  <p
                    className="absolute top-0 left-0 -mt-14 ml-10 text-webriq-darkblue opacity-20 text-9xl font-semibold"
                    style={{ width: "69px", height: "103px" }}
                  >
                    {index + 1}
                  </p>
                  <p className="text-2xl font-bold">{step?.title}</p>
                  <p className="text-gray-500 leading-loose">
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
