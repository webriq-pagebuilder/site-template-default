import React from "react"

function VariantE({ subtitle, title, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-md text-center mx-auto">
            <span className="text-green-600 font-bold">{subtitle}</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
          </div>
          {steps && (
            <div className="relative flex flex-wrap -mx-4 z-0">
              <div
                className="hidden lg:block absolute inset-x-0 max-w-2xl xl:max-w-3xl mx-auto py-px rounded bg-green-600"
                style={{ top: "10%", zIndex: -1 }}
              />
              {steps?.map((step, index) => (
                <div
                  className="mb-8 w-full lg:w-1/3 px-4 text-center"
                  key={index}
                >
                  <span className="relative mb-6 lg:mb-10 mx-auto flex w-16 h-16 items-center justify-center bg-green-600 rounded-full text-white text-2xl">
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
  )
}
export default React.memo(VariantE)
