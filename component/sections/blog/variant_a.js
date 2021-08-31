import React from "react";
import PropTypes from "prop-types";
import { urlFor } from "../../../lib/sanity";

function VariantA({ caption, title, posts, buttonLabel }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            {caption && (
              <span className="text-webriq-darkblue font-bold">{caption}</span>
            )}
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            )}
          </div>
          {posts && (
            <div className="flex flex-wrap justify-center -mx-3">
              <div className="flex flex-wrap w-full lg:w-1/2">
                <div className="w-full px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[0]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[0]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[0]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[0]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[0]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[0]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative h-64 mx-auto rounded">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[0]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[0]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-2xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[0]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[1]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[1]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[1]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[1]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[1]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[1]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative mx-auto rounded h-128">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[1]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-12 py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[1]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[1]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[2]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[2]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[2]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[2]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[2]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[2]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative mx-auto rounded h-128">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[2]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-12 py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[2]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[2]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                <div className="w-full lg:w-1/2 px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[3]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[3]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[3]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[3]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[3]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[3]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative mx-auto rounded h-128">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[3]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-12 py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[3]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[3]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[4]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[4]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[4]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[4]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[4]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[4]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative mx-auto rounded h-128">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[4]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-12 py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[4]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[4]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full px-3 mb-5">
                  <a
                    href={
                      posts?.[0]?.blogPosts?.[5]?.primaryButton?.type ===
                      "linkExternal"
                        ? posts?.[0]?.blogPosts?.[5]?.primaryButton
                            ?.externalLink
                        : posts?.[0]?.blogPosts?.[5]?.primaryButton?.type ===
                          "linkInternal"
                        ? posts?.[0]?.blogPosts?.[5]?.primaryButton
                            ?.internalLink === "Home" ||
                          posts?.[0]?.blogPosts?.[5]?.primaryButton
                            ?.internalLink === "home"
                          ? "/"
                          : posts?.[0]?.blogPosts?.[5]?.primaryButton
                              ?.internalLink
                        : "page-not-found"
                    }
                  >
                    <div className="relative mx-auto rounded h-64">
                      <img
                        className="relative h-full w-full rounded object-cover"
                        src={urlFor(posts?.[0]?.blogPosts?.[5]?.mainImage)}
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                      <div className="absolute inset-0 p-6 flex flex-col items-start">
                        <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold">
                          {posts?.[0]?.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {posts?.[0]?.blogPosts?.[5]?.dateAdded}
                        </span>
                        <p className="text-xl lg:text-2xl text-white font-bold">
                          {posts?.[0]?.blogPosts?.[5]?.heading}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="mt-10">
                {posts?.length >= 6 && buttonLabel && (
                  <button className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose outline-none transition duration-200">
                    {buttonLabel}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
VariantA.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  posts: PropTypes.object,
};
export default React.memo(VariantA);
