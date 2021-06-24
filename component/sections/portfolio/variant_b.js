import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantB({
  /* template,*/ caption,
  title,
  portfolios,
  primaryButton,
}) {
  return (
    <section>
      <div className="skew skew-top mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 10 0 10" />
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10" />
        </svg>
      </div>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container px-4 mx-auto">
          <div className="mb-16 flex flex-wrap justify-center md:justify-between items-center">
            <div className="text-center lg:text-left">
              {caption && (
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
              )}
              {title && (
                <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                  {title}
                </h2>
              )}
            </div>
            {primaryButton?.label && (
              <a
                className="md:inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                href={
                  primaryButton.type === "linkInternal"
                    ? primaryButton.internalLink === "Home" ||
                      primaryButton.internalLink === "home"
                      ? "/"
                      : primaryButton.internalLink
                    : primaryButton.externalLink
                }
              >
                {primaryButton.label}
              </a>
            )}
          </div>
          <div className="flex flex-wrap -mx-4 mb-4">
            {portfolios &&
              portfolios.map((portfolio) => (
                <div
                  className="relative mb-4 w-full md:w-1/2 lg:w-1/3 px-4"
                  key={portfolio.heading}
                >
                  <div className="relative h-80 mb-5 mx-auto rounded-lg">
                    <img
                      className="h-80 w-full relative h-full rounded-lg object-cover"
                      src={urlFor(portfolio.mainImage)}
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-75 rounded-lg" />
                    <div className="absolute inset-0 p-6 flex flex-col items-start">
                      <span className="text-gray-400">
                        {portfolio.dateAdded}
                      </span>
                      <p className="mb-auto text-xl lg:text-2xl text-white font-bold">
                        {portfolio.heading}
                      </p>
                      {primaryButton?.label && (
                        <a
                          className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white bg-transparent text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                          href={
                            // primaryButton.type === "linkInternal" ? (
                            //   primaryButton.internalLink === "Home" ||
                            //   primaryButton.internalLink === "home"
                            //     ? "/"
                            //     : primaryButton.internalLink) : primaryButton.externalLink
                            "/porfolio"
                          }
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {/*             
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 px-4">
              <a href="#">
                <img
                  className="h-80 w-full mx-auto object-cover rounded"
                  src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=968&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 px-4">
              <a href="#">
                <img
                  className="h-80 w-full mx-auto object-cover rounded"
                  src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1127&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 px-4">
              <a href="#">
                <img
                  className="h-80 w-full mx-auto object-cover rounded"
                  src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 px-4">
              <a href="#">
                <img
                  className="h-80 w-full mx-auto object-cover rounded"
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                  alt=""
                />
              </a>
            </div> */}
          </div>
          <div className="text-center">
            {primaryButton?.label && (
              <a
                className="md:hidden inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
                href={
                  primaryButton.type === "linkInternal"
                    ? primaryButton.internalLink === "Home" ||
                      primaryButton.internalLink === "home"
                      ? "/"
                      : primaryButton.internalLink
                    : primaryButton.externalLink
                }
              >
                {primaryButton.label}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="skew skew-bottom mr-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10" />
        </svg>
      </div>
      <div className="skew skew-bottom ml-for-radius">
        <svg
          className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 10 10" />
        </svg>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
