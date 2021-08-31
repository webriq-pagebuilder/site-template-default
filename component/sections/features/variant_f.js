import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "../../../lib/sanity";

function VariantF({ caption, title, description, images, primaryButton }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2 flex px-4">
              <div className="max-w-md">
                <span className="text-webriq-darkblue font-bold">
                  {caption}
                </span>
                {title && (
                  <h2 className="mb-6 text-4xl lg:text-5xl font-bold font-heading">
                    {title}
                  </h2>
                )}
                {description && (
                  <div className="mb-6 max-w-sm">
                    <p className="text-gray-500 leading-loose">{description}</p>
                  </div>
                )}
                {primaryButton && (
                  <div className="flex flex-wrap lg:-ml-5">
                    <a
                      className="lg:w-auto py-2 px-6 leading-loose lg:ml-5 text-gray-50 font-bold bg-webriq-blue hover:bg-webriq-darkblue transition duration-200 rounded-l-xl rounded-t-xl"
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
                            : primaryButton?.internalLink
                          : "page-not-found"
                      }
                    >
                      {primaryButton.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="mb-4 flex flex-wrap items-end">
                {images?.[0] && (
                  <div className="mb-4 lg:mb-0 w-full lg:w-2/3 px-3">
                    <img
                      className="w-full h-32 lg:h-48 object-cover rounded"
                      src={urlFor(images[0])}
                      alt=""
                    />
                  </div>
                )}
                {images?.[1] && (
                  <div className="w-full lg:w-1/3 px-3">
                    <img
                      className="w-full h-32 object-cover rounded"
                      src={urlFor(images[1])}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-start">
                {images?.[2] && (
                  <div className="mb-4 lg:mb-0 w-full lg:w-1/3 px-3">
                    <img
                      className="w-full h-32 object-cover rounded"
                      src={urlFor(images[2])}
                      alt=""
                    />
                  </div>
                )}
                {images?.[3] && (
                  <div className="w-full lg:w-2/3 px-3">
                    <img
                      className="w-full h-32 lg:h-48 object-cover rounded"
                      src={urlFor(images[3])}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantF);
