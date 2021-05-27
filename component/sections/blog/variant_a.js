import React from "react"
import PropTypes from "prop-types"
import { urlFor } from "../../../lib/sanity"

function VariantA({ caption, title, posts, primaryButton }) {
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
          <div className="mb-16 text-center">
            {caption && (
              <span className="text-green-600 font-bold">{caption}</span>
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
                  <a href="#">
                    {posts?.[0] && (
                      <div className="relative h-64 mx-auto rounded">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts[0].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[0]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[0].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[0].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[0].heading}
                          </p>
                        </div>
                      </div>
                    )}
                  </a>
                </div>
                <div className="w-full lg:w-1/2 px-3 mb-5">
                  <a href="#">
                    {posts?.[1]?.mainImage && (
                      <div className="relative mx-auto rounded h-128">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts?.[1].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[1]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[1].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[1].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[1].heading}
                          </p>
                        </div>
                      </div>
                    )}
                  </a>
                </div>
                {posts?.[2]?.mainImage && (
                  <div className="w-full lg:w-1/2 px-3 mb-5">
                    <a href="#">
                      <div className="relative mx-auto rounded h-128">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts?.[2].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[2]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[2].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[2].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[2].heading}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts?.[3]?.mainImage && (
                  <div className="w-full lg:w-1/2 px-3 mb-5">
                    <a href="#">
                      <div className="relative mx-auto rounded h-128">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts?.[3].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[3]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[3].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[3].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[3].heading}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
                {posts?.[4]?.mainImage && (
                  <div className="w-full lg:w-1/2 px-3 mb-5">
                    <a href="#">
                      <div className="relative mx-auto rounded h-128">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts?.[4].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[4]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[4].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[4].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[4].heading}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
                {posts?.[5]?.mainImage && (
                  <div className="w-full px-3 mb-5">
                    <a href="#">
                      <div className="relative mx-auto rounded h-64">
                        <img
                          className="relative h-full w-full rounded object-cover"
                          src={urlFor(posts?.[4].mainImage)}
                          alt=""
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                        <div className="absolute inset-0 p-6 flex flex-col items-start">
                          {posts?.[5]?.category && (
                            <span className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-green-600 uppercase font-bold">
                              {posts[5].category}
                            </span>
                          )}
                          <span className="text-sm text-gray-400">
                            {posts[5].dateAdded}
                          </span>
                          <p className="text-xl lg:text-2xl text-white font-bold">
                            {posts[5].heading}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-10">
                {posts?.length >= 6 && primaryButton && (
                  <a
                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose outline-none transition duration-200"
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
          )}
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
  )
}
VariantA.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  posts: PropTypes.object,
}
export default React.memo(VariantA)
