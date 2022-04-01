import React from "react";

function VariantA({ subtitle, title, text, video, steps }) {
  // get the video link ID
  let videoLinkId;

  if (video) {
    if (video.includes("embed")) {
      videoLinkId = video.split("/")[4];
    } else {
      videoLinkId = video.split("/watch?v=")[1] || video.split("/")[3];
    }
  }

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap">
            <div className="mb-10 lg:mb-0 w-full lg:w-1/2">
              <div className="max-w-lg mx-10">
                <span className="text-sm md:text-lg lg:text-lg text-webriq-darkblue font-bold">
                  {subtitle}
                </span>
                <h1 className="my-5 text-2xl md:text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h1>
                <p className="text-sm md:text-lg lg:text-lg text-gray-500 md:leading-loose lg:leading-loose">
                  {text}
                </p>
              </div>
            </div>
            <div className="relative w-full md:w-2/5 md:h-96 lg:w-2/5 lg:h-128 px-10 md:px-0 lg:px-0">
              {video && (
                <iframe
                  aria-label="Show Video Frame"
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoLinkId}`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:8px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${videoLinkId}`}><img src=${`https://i.ytimg.com/vi_webp/${videoLinkId}/maxresdefault.webp`} alt=${title} loading="lazy" /><span>▶</span></a>`}
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                ></iframe>
              )}
            </div>
          </div>

          <div className="flex flex-wrap px-10">
            {steps &&
              steps?.map((step, index) => (
                <div
                  className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-5"
                  key={index}
                >
                  <span className="mt-6 mb-6 w-12 h-12 flex justify-center items-center bg-webriq-lightblue rounded text-webriq-darkblue font-bold">
                    {index + 1}
                  </span>
                  <p className="mb-2 text-lg md:text-2xl lg:text-2xl font-bold font-heading">
                    {step?.title}
                  </p>
                  <p className="text-gray-500 text-xs md:text-lg lg:text-lg md:leading-loose lg:leading-loose">
                    {step?.plainText}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
