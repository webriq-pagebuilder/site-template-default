import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "../../../lib/sanity";
import { useRouter } from "next/router";

function VariantF({ caption, title, description, images, primaryButton }) {
  const router = useRouter();
  const navigate = () => {
    primaryButton.type === "linkInternal"
      ? primaryButton.internalLink === "Home" ||
        primaryButton.internalLink === "home"
        ? router.push("/")
        : router.push(primaryButton.internalLink)
      : router.push(primaryButton.externalLink);
  };
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
                    <button
                      className="lg:w-auto py-2 px-6 leading-loose lg:ml-5 text-gray-50 font-bold bg-webriq-blue hover:bg-webriq-darkblue transition duration-200 rounded-l-xl rounded-t-xl"
                      onClick={navigate}
                    >
                      {primaryButton.label}
                    </button>
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
VariantF.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.array,
  images: PropTypes.array,
  button: PropTypes.object,
};
export default React.memo(VariantF);
