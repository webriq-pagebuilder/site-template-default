import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantA({ subtitle, title, posts, buttonLabel }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [blogsPerPage] = React.useState(6);

  // get blog list
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  return (
    <section>
      <div className="p-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            {subtitle && (
              <span className="text-webriq-darkblue font-bold">{subtitle}</span>
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
                {posts
                  ?.slice(indexOfFirstBlog, indexOfFirstBlog + 1)
                  ?.map((post, key) => (
                    <div className="w-full px-3 mb-5" key={key}>
                      <Link href={`/${post?.slug?.current}`}>
                        <a>
                          <div className="relative h-64 mx-auto rounded transform hover:scale-110 motion-reduce:transform-none">
                            {post?.mainImage && (
                              <img
                                className="relative h-full w-full rounded object-cover"
                                src={urlFor(post?.mainImage)}
                                alt=""
                              />
                            )}
                            <div className="absolute inset-0 bg-gray-700 opacity-75 rounded" />
                            <div className="absolute inset-0 p-6 flex flex-col items-start">
                              {post?.categories &&
                                post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              <div className="flex">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <>
                                          <span
                                            className="text-sm text-webriq-babyblue"
                                            key={index}
                                          >
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-400 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-400">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="text-xl lg:text-2xl text-white font-bold">
                                  {post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                {posts
                  ?.slice(indexOfFirstBlog + 1, indexOfFirstBlog + 3)
                  ?.map((post, key) => (
                    <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                      <Link href={`/${post?.slug?.current}`}>
                        <a>
                          <div className="relative mx-auto rounded h-128 transform hover:scale-110 motion-reduce:transform-none">
                            {post?.mainImage && (
                              <img
                                className="relative h-full w-full rounded object-cover"
                                src={urlFor(post?.mainImage)}
                                alt=""
                              />
                            )}
                            <div className="absolute inset-0 bg-gray-700 opacity-75 rounded" />
                            <div className="absolute inset-0 p-6 flex flex-col items-start">
                              {post?.categories &&
                                post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              <div className="flex">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <>
                                          <span
                                            className="text-sm text-webriq-babyblue"
                                            key={index}
                                          >
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-400 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-400">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="text-xl lg:text-2xl text-white font-bold">
                                  {post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="flex flex-wrap w-full lg:w-1/2">
                {posts
                  ?.slice(indexOfFirstBlog + 3, indexOfFirstBlog + 5)
                  ?.map((post, key) => (
                    <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                      <Link href={`/${post?.slug?.current}`}>
                        <a>
                          <div className="relative mx-auto rounded h-128 transform hover:scale-110 motion-reduce:transform-none">
                            {post?.mainImage && (
                              <img
                                className="relative h-full w-full rounded object-cover"
                                src={urlFor(post?.mainImage)}
                                alt=""
                              />
                            )}
                            <div className="absolute inset-0 bg-gray-700 opacity-75 rounded" />
                            <div className="absolute inset-0 p-6 flex flex-col items-start">
                              {post?.categories &&
                                post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              <div className="flex">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <>
                                          <span
                                            className="text-sm text-webriq-babyblue"
                                            key={index}
                                          >
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-400 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-400">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="text-xl lg:text-2xl text-white font-bold">
                                  {post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                {posts
                  ?.slice(indexOfFirstBlog + 5, indexOfLastBlog)
                  ?.map((post, key) => (
                    <div className="w-full px-3 mb-5" key={key}>
                      <Link href={`/${post?.slug?.current}`}>
                        <a>
                          <div className="relative mx-auto rounded h-64 transform hover:scale-110 motion-reduce:transform-none">
                            {post?.mainImage && (
                              <img
                                className="relative h-full w-full rounded object-cover"
                                src={urlFor(post?.mainImage)}
                                alt=""
                              />
                            )}
                            <div className="absolute inset-0 bg-gray-700 opacity-75 rounded" />
                            <div className="absolute inset-0 p-6 flex flex-col items-start">
                              {post?.categories &&
                                post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              <div className="flex">
                                {post?.authors && (
                                  <div className="flex">
                                    {post?.authors?.map(
                                      (author, index, { length }) => (
                                        <>
                                          <span
                                            className="text-sm text-webriq-babyblue"
                                            key={index}
                                          >
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </>
                                      )
                                    )}
                                  </div>
                                )}
                                {post?.publishedAt && post?.authors && (
                                  <span className="text-sm text-gray-400 mx-2">
                                    •
                                  </span>
                                )}
                                {post?.publishedAt && (
                                  <span className="text-sm text-gray-400">
                                    {format(
                                      new Date(post?.publishedAt),
                                      "dd MMM, yyyy"
                                    )}
                                  </span>
                                )}
                              </div>
                              {post?.title && (
                                <p className="text-xl lg:text-2xl text-white font-bold">
                                  {post?.title}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="mt-10">
                {posts?.length > 6 && buttonLabel && (
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
export default React.memo(VariantA);
