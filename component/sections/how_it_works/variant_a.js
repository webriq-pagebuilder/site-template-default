import React from "react";

function VariantA({ subtitle, title, text, video, steps }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap">
            <div className="mb-10 lg:mb-0 w-full lg:w-1/2">
              <div className="max-w-md mx-20">
                <span className="text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
                <h2 className="mb-2 text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
                <p className="max-w-xs text-gray-500 leading-loose">{text}</p>
              </div>
            </div>
            <div className="relative w-full lg:w-1/4">
              {video ? (
                <iframe
                  //className="rounded-3xl md:rounded-6xl md:rounded-br-none border-4 border-webriq-blue"
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
              ) : (
                <>
                  <img
                    className="relative rounded-lg"
                    src="https://images.unsplash.com/photo-1607556772227-fe3868023d27?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                    alt=""
                  />
                  <button className="text-white hover:text-gray-50">
                    <svg
                      className="absolute w-16 h-16"
                      style={{ top: "38%", left: "45%" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap px-16">
            {steps &&
              steps?.map((step, index) => (
                <div
                  className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-5"
                  key={index}
                >
                  <span className="mt-6 mb-6 w-12 h-12 flex justify-center items-center bg-webriq-lightblue rounded text-webriq-darkblue font-bold">
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
  );
}
export default React.memo(VariantA);
