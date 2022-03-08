import React from "react";

function NoPreview() {
  return (
    <section className="bg-gray-50">
      <div className="py-20">
        <div className="container mx-auto px-4">
          <img
            className="mx-auto"
            src="https://cdn.sanity.io/images/9itgab5x/production/8f90c590ada0a2f3c89c35535c323320627b9622-554x312.png"
            alt=""
          />
          <div className="text-center">
            <span className="mb-6 text-4xl text-webriq-darkblue font-bold">
              Whoops!
            </span>
            <p className="my-8 text-gray-700">
              Publish your page first to preview LIVE site
            </p>
            <div>
              <a
                className="w-full lg:w-auto mb-2 lg:mb-0 lg:mr-4 inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose text-white bg-webriq-darkblue hover:bg-webriq-blue"
                href="/"
              >
                Go back to Homepage
              </a>
              <button
                className="w-full lg:w-auto inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose bg-white hover:bg-gray-50"
                onClick={() => window.location.reload(true)}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(NoPreview);
