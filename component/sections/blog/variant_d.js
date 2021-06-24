import { urlFor } from "lib/sanity";
import React from "react";

function VariantD({ caption, title, posts, primaryButton }) {
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
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <span className="text-webriq-darkblue font-bold">{caption}</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            </div>
            <div className="hidden lg:block text-right w-1/2">
              {primaryButton && (
                <a
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200"
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
          <div className="flex flex-wrap -mx-3">
            {posts?.length !== 0 && (
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-white shadow rounded">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Topics
                  </h4>
                  <ul>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded text-webriq-darkblue font-bold bg-gray-50"
                        href="#"
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Community
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Design
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Engineering
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Marketplace
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Culture
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Product Updates
                      </a>
                    </li>
                    <li>
                      <a
                        className="block py-2 px-3 mb-4 rounded hover:text-webriq-darkblue hover:bg-gray-50"
                        href="#"
                      >
                        Trust &amp; Security
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <div className="w-full lg:w-3/4 px-3">
              {posts &&
                posts?.map((post) => (
                  <div
                    className="flex flex-wrap -mx-3 mb-8 lg:mb-6"
                    key={post.heading}
                  >
                    <div className="mb-4 lg:mb-0 w-full lg:w-1/4 px-3">
                      <img
                        className="w-full h-full object-cover rounded"
                        src={urlFor(post.mainImage)}
                        alt=""
                      />
                    </div>
                    <div className="w-full lg:w-3/4 px-3">
                      <a className="hover:underline" href="#">
                        <h3 className="mb-1 text-2xl font-bold font-heading">
                          {post.heading}
                        </h3>
                      </a>
                      <div className="mb-2 flex items-center text-sm">
                        <a
                          className="text-webriq-darkblue hover:underline hover:text-webriq-darkblue"
                          href="#"
                        >
                          {post.postedBy}
                        </a>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-400">{post.dateAdded}</span>
                      </div>
                      <p className="text-gray-500">{post.description}</p>
                    </div>
                  </div>
                ))}
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
export default React.memo(VariantD);
