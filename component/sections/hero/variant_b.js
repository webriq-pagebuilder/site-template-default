import React from "react";
import { urlFor } from "lib/sanity";

function VariantB({
  template,
  images,
  title,
  description,
  primaryButton,
  secondaryButton,
}) {
  return (
    <>
      <section className="relative bg-gray-50">
        <div className="relative pt-12 lg:pt-20 pb-20 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0 flex items-center">
                <div className="w-full text-center lg:text-left">
                  <div className="max-w-md mx-auto lg:mx-0">
                    <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                      {title && (
                        <>
                          <span>{String(title).split("*")[0]}</span>
                          <span className={`text-${template.color}-600`}>
                            {String(title).split("*")[1]}
                          </span>
                        </>
                      )}
                    </h2>
                  </div>
                  <div className="max-w-sm mx-auto lg:mx-0">
                    {description && (
                      <p className="mb-6 text-gray-400 leading-loose">
                        {description}
                      </p>
                    )}

                    <div>
                      {primaryButton && (
                        <a
                          className="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose bg-webriq-blue hover:bg-webriq-darkblue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                          target={primaryButton?.linkTarget}
                          rel={
                            primaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
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
                      {secondaryButton && (
                        <a
                          className="inline-block w-full lg:w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                          target={secondaryButton?.linkTarget}
                          rel={
                            secondaryButton?.linkTarget === "_blank"
                              ? "noopener noreferrer"
                              : null
                          }
                          href={
                            secondaryButton.type === "linkInternal"
                              ? secondaryButton.internalLink === "Home" ||
                                secondaryButton.internalLink === "home"
                                ? "/"
                                : secondaryButton.internalLink
                              : secondaryButton.externalLink
                          }
                        >
                          {secondaryButton.label}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {images && (
                <div className="w-full lg:w-1/2 px-4">
                  <div className="flex flex-wrap lg:mb-4 lg:ml-6">
                    {images?.[0] && (
                      <img
                        className="w-full md:w-1/2 lg:w-1/3 h-64 p-2 object-cover rounded-3xl rounded-br-none"
                        src={urlFor(images?.[0])}
                        alt=""
                      />
                    )}
                    {images?.[1] && (
                      <img
                        className="w-full md:w-1/2 lg:w-2/3 h-64 p-2 object-cover rounded-3xl rounded-bl-none"
                        src={urlFor(images?.[1])}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap lg:mb-4 lg:mr-6">
                    {images?.[2] && (
                      <img
                        className="w-full md:w-1/2 lg:w-2/3 h-64 p-2 object-cover rounded-3xl rounded-br-none"
                        src={urlFor(images?.[2])}
                        alt=""
                      />
                    )}
                    {images?.[3] && (
                      <img
                        className="w-full md:w-1/2 lg:w-1/3 h-64 p-2 object-cover rounded-3xl rounded-bl-none"
                        src={urlFor(images?.[3])}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(VariantB);
