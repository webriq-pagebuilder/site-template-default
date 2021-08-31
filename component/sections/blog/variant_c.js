import React from "react";
import { urlFor } from "../../../lib/sanity";

function VariantC({ caption, title, posts, buttonLabel }) {
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <span className="text-webriq-darkblue font-bold">
                {caption && caption}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                {title && title}
              </h2>
            </div>
            {buttonLabel && (
              <div className="hidden lg:block text-right w-1/2">
                <button className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose transition duration-200">
                  {buttonLabel}
                </button>
              </div>
            )}
          </div>
          {posts &&
            posts?.map((post, index) => (
              <>
                {index % 2 === 0 ? (
                  <div className="mb-8 flex flex-wrap rounded-lg shadow overflow-hidden">
                    <div className="w-full lg:w-1/2 rounded-l">
                      <img
                        className="object-cover"
                        src={urlFor(post.mainImage)}
                        alt=""
                      />
                    </div>
                    <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white">
                      <span className="text-sm text-gray-400">
                        {post.dateAdded}
                      </span>
                      <h2 className="my-4 text-2xl font-bold">
                        {post.heading}
                      </h2>
                      <p className="mb-4 text-gray-400 leading-loose">
                        {post.description}
                      </p>
                      <a
                        className="text-webriq-darkblue hover:text-webriq-darkblue font-bold"
                        href={
                          post?.primaryButton?.type === "linkExternal"
                            ? post?.primaryButton?.externalLink
                            : post?.primaryButton?.type === "linkInternal"
                            ? post?.primaryButton?.internalLink === "Home" ||
                              post?.primaryButton?.internalLink === "home"
                              ? "/"
                              : post?.primaryButton?.internalLink
                            : "page-not-found"
                        }
                      >
                        {post?.primaryButton?.label}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 flex flex-wrap rounded-lg shadow overflow-hidden">
                    <div className="w-full lg:w-1/2 py-6 lg:pt-10 px-6 rounded-r bg-white order-1 lg:order-0">
                      <span className="text-sm text-gray-400">
                        {post.dateAdded}
                      </span>
                      <h2 className="my-4 text-2xl font-bold">
                        {post.heading}
                      </h2>
                      <p className="mb-4 text-gray-400 leading-loose">
                        {post.description}
                      </p>
                      <a
                        className="text-webriq-darkblue hover:text-webriq-darkblue font-bold"
                        href="#"
                      >
                        Learn More
                      </a>
                    </div>
                    <div className="w-full lg:w-1/2 rounded-l order-0 lg:order-1">
                      <img
                        className="object-cover"
                        src={urlFor(post.mainImage)}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </>
            ))}

          {posts?.length > 5 && (
            <div className="flex justify-center">
              <nav
                className="flex items-center bg-white shadow rounded"
                aria-label="Pagination"
              >
                <a className="px-4 text-gray-400 hover:text-gray-500" href="#">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
                <div className="p-2 border-r border-l text-gray-500">
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    1
                  </a>
                  <a
                    className="mx-1 px-2 rounded bg-gray-50 text-gray-800 font-bold"
                    href="#"
                  >
                    2
                  </a>
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    3
                  </a>
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    4
                  </a>
                  <span className="mx-3">...</span>
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    16
                  </a>
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    17
                  </a>
                  <a
                    className="mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800"
                    href="#"
                  >
                    18
                  </a>
                </div>
                <a className="px-4 text-gray-400 hover:text-gray-500" href="#">
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
