import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantB({ caption, title, posts, buttonLabel }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap justify-center">
            <div className="mb-16 w-full text-center">
              <span className="text-webriq-blue font-bold">{caption}</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h2>
            </div>
            {posts && (
              <div className="flex flex-wrap -mx-3 mb-16">
                <div className="mb-6 lg:mb-0 w-full lg:w-1/2 px-3">
                  <div className="h-full flex flex-col rounded shadow">
                    <img
                      className="rounded-t object-cover h-80 lg:h-full w-full"
                      src={urlFor(posts?.[0]?.mainImage)}
                      alt=""
                    />
                    <div className="mt-auto p-6 rounded-b bg-white">
                      <span className="text-sm text-gray-400">
                        {posts?.[0]?.dateAdded}
                      </span>
                      <h2 className="my-2 text-2xl font-bold">
                        {posts?.[0]?.heading}
                      </h2>
                      <p className="mb-6 text-gray-400 leading-loose">
                        {posts?.[0]?.description}
                      </p>
                      <a
                        className="text-webriq-blue hover:text-webriq-darkblue font-bold"
                        href={
                          posts?.[0]?.primaryButton?.type === "linkExternal"
                            ? posts?.[0]?.primaryButton?.externalLink
                            : posts?.[0]?.primaryButton?.type === "linkInternal"
                            ? posts?.[0]?.primaryButton?.internalLink ===
                                "Home" ||
                              posts?.[0]?.primaryButton?.internalLink === "home"
                              ? "/"
                              : posts?.[0]?.primaryButton?.internalLink
                            : "page-not-found"
                        }
                      >
                        {posts?.[0]?.primaryButton?.label}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap w-full lg:w-1/2">
                  <div className="mb-6 w-full lg:w-1/2 px-3">
                    <div className="rounded overflow-hidden shadow">
                      <img
                        className="lg:h-48 rounded-t"
                        src={urlFor(posts?.[1]?.mainImage)}
                        alt=""
                      />
                      <div className="p-6 rounded-b bg-white">
                        <span className="text-sm text-gray-400">
                          {posts?.[1]?.dateAdded}
                        </span>
                        <h2 className="my-2 text-2xl font-bold">
                          {posts?.[1]?.heading}
                        </h2>
                        <a
                          className="text-webriq-blue hover:text-webriq-darkblue font-bold"
                          href={
                            posts?.[1]?.primaryButton?.type === "linkExternal"
                              ? posts?.[1]?.primaryButton?.externalLink
                              : posts?.[1]?.primaryButton?.type ===
                                "linkInternal"
                              ? posts?.[1]?.primaryButton?.internalLink ===
                                  "Home" ||
                                posts?.[1]?.primaryButton?.internalLink ===
                                  "home"
                                ? "/"
                                : posts?.[1]?.primaryButton?.internalLink
                              : "page-not-found"
                          }
                        >
                          {posts?.[1]?.primaryButton?.label}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full lg:w-1/2 px-3">
                    <div className="rounded overflow-hidden shadow">
                      <img
                        className="lg:h-48 rounded-t"
                        src={urlFor(posts?.[2]?.mainImage)}
                        alt=""
                      />
                      <div className="p-6 rounded-b bg-white">
                        <span className="text-sm text-gray-400">
                          {posts?.[2]?.dateAdded}
                        </span>
                        <h2 className="my-2 text-2xl font-bold">
                          {posts?.[2]?.heading}
                        </h2>
                        <a
                          className="text-webriq-blue hover:text-webriq-darkblue font-bold"
                          href={
                            posts?.[2]?.primaryButton?.type === "linkExternal"
                              ? posts?.[2]?.primaryButton?.externalLink
                              : posts?.[2]?.primaryButton?.type ===
                                "linkInternal"
                              ? posts?.[2]?.primaryButton?.internalLink ===
                                  "Home" ||
                                posts?.[2]?.primaryButton?.internalLink ===
                                  "home"
                                ? "/"
                                : posts?.[2]?.primaryButton?.internalLink
                              : "page-not-found"
                          }
                        >
                          {posts?.[2]?.primaryButton?.label}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full lg:w-1/2 px-3">
                    <div className="rounded overflow-hidden shadow">
                      <img
                        className="lg:h-48 rounded-t"
                        src={urlFor(posts?.[3]?.mainImage)}
                        alt=""
                      />
                      <div className="p-6 rounded-b bg-white">
                        <span className="text-sm text-gray-400">
                          {posts?.[3]?.dateAdded}
                        </span>
                        <h2 className="my-2 text-2xl font-bold">
                          {posts?.[3]?.heading}
                        </h2>
                        <a
                          className="text-webriq-blue hover:text-webriq-darkblue font-bold"
                          href={
                            posts?.[3]?.primaryButton?.type === "linkExternal"
                              ? posts?.[3]?.primaryButton?.externalLink
                              : posts?.[3]?.primaryButton?.type ===
                                "linkInternal"
                              ? posts?.[3]?.primaryButton?.internalLink ===
                                  "Home" ||
                                posts?.[3]?.primaryButton?.internalLink ===
                                  "home"
                                ? "/"
                                : posts?.[3]?.primaryButton?.internalLink
                              : "page-not-found"
                          }
                        >
                          {posts?.[3]?.primaryButton?.label}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full lg:w-1/2 px-3">
                    <div className="rounded overflow-hidden shadow">
                      <img
                        className="lg:h-48 rounded-t"
                        src={urlFor(posts?.[4]?.mainImage)}
                        alt=""
                      />
                      <div className="p-6 rounded-b bg-white">
                        <span className="text-sm text-gray-400">
                          {posts?.[4]?.dateAdded}
                        </span>
                        <h2 className="my-2 text-2xl font-bold">
                          {posts?.[4]?.heading}
                        </h2>
                        <a
                          className="text-webriq-darkblue hover:text-webriq-darkblue font-bold"
                          href={
                            posts?.[4]?.primaryButton?.type === "linkExternal"
                              ? posts?.[4]?.primaryButton?.externalLink
                              : posts?.[4]?.primaryButton?.type ===
                                "linkInternal"
                              ? posts?.[4]?.primaryButton?.internalLink ===
                                  "Home" ||
                                posts?.[4]?.primaryButton?.internalLink ===
                                  "home"
                                ? "/"
                                : posts?.[4]?.primaryButton?.internalLink
                              : "page-not-found"
                          }
                        >
                          {posts?.[4]?.primaryButton?.label}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {buttonLabel && (
              <div>
                <button className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose outline-none transition duration-200">
                  {buttonLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
