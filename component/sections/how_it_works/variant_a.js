import React from "react"

function VariantA({ subtitle, title, text, video, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap">
            <div className="mb-10 lg:mb-0 w-full lg:w-1/2">
              <div className="max-w-md mx-20">
                <span className="text-green-600 font-bold">{subtitle}</span>
                <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
                <p className="max-w-xs text-gray-500 leading-loose">{text}</p>
              </div>
            </div>
            <div className="relative w-full lg:w-1/4">
              {video && (
                <iframe
                  //className="rounded-3xl md:rounded-6xl md:rounded-br-none border-4 border-green-600"
                  className="relative rounded-lg"
                  width="550"
                  height="355"
                  src={`https://www.youtube.com/embed/${
                    String(video).split("=")[1].split("&")[0]
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 px-4">
            {steps &&
              steps?.map((step, index) => (
                <div
                  className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4"
                  key={index}
                >
                  <span className="mt-6 mb-6 w-12 h-12 flex justify-center items-center bg-green-100 rounded text-green-600 font-bold">
                    {index + 1}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold font-heading">
                    {step?.title}
                  </h3>
                  <p className="text-gray-500 leading-loose">{step?.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(VariantA)
