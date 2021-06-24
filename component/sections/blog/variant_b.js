import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantB({ caption, title, posts, primaryButton }) {
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
          <div className="mb-6 flex flex-wrap justify-center">
            <div className="mb-16 w-full text-center">
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
            {posts && (
              <div className="flex flex-wrap -mx-3 mb-16">
                <div className={`flex flex-wrap w-full lg:w-1/2`}>
                  {posts.map((post) => (
                    <div
                      className={`mb-6 lg:mb-0 w-full lg:w-1/2 px-3`}
                      key={post.heading}
                    >
                      <div className="h-full flex flex-col rounded shadow">
                        <img
                          className="rounded-t object-cover h-24 lg:h-72 w-full"
                          src={urlFor(post.mainImage)}
                          alt=""
                        />
                        <div className="mt-auto p-6 rounded-b bg-white">
                          <span className="text-sm text-gray-400">
                            {post.dateAdded}
                          </span>
                          <h2 className="my-2 text-2xl font-bold">
                            {post.heading}
                          </h2>
                          <p className="mb-6 text-gray-400 leading-loose">
                            {post.description}
                          </p>
                          <a
                            className="text-webriq-darkblue hover:text-webriq-darkblue font-bold"
                            href="#"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              {posts?.length >= 6 && primaryButton && (
                <a
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose outline-none transition duration-200"
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
