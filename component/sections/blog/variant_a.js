import React from "react";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantA({ subtitle, title, posts, buttonLabel }) {
  let blogsPerPage = 6,
    count = 0;
  const [blogsToShow, setBlogsToShow] = React.useState(count + 1); // set number of blogs to show
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // split array into groups of 6 posts
  const splitPosts = (arr, size, numberOfGroups) => {
    const chunks = arr.reduce(
      (chunks, items, i) =>
        (i % size
          ? chunks[chunks?.length - 1].push(items)
          : chunks.push([items])) && chunks,
      []
    );
    if (chunks[chunks?.length - 1]?.length < numberOfGroups) {
      chunks.pop();
    }
    return chunks;
  };

  const newArray = splitPosts(
    posts,
    blogsPerPage,
    Math.ceil(posts?.length / blogsPerPage)
  );

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
          {newArray &&
            newArray?.slice(count, blogsToShow)?.map((posts, index) => (
              <div className="flex flex-wrap justify-center -mx-3" key={index}>
                <div className="flex flex-wrap w-full lg:w-1/2">
                  {posts?.slice(count, count + 1)?.map((post, key) => (
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
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
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
                  {posts?.slice(count + 1, count + 3)?.map((post, key) => (
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
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
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
                                <p className="text-xl lg:text-2xl text-white font-bold overflow-ellipsis overflow-hidden">
                                  {post?.title}...
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
                  {posts?.slice(count + 3, count + 5)?.map((post, key) => (
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
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
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
                                <p className="text-xl lg:text-2xl text-white font-bold overflow-ellipsis overflow-hidden">
                                  {post?.title}...
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                  {posts?.slice(count + 5, blogsPerPage)?.map((post, key) => (
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
                                        <div key={index}>
                                          <span className="text-sm text-webriq-babyblue">
                                            {author?.name}
                                          </span>
                                          {index + 1 !== length ? (
                                            <span className="text-sm text-webriq-babyblue">
                                              &nbsp;,&nbsp;
                                            </span>
                                          ) : null}
                                        </div>
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
              </div>
            ))}
          <div className="mt-10 text-center">
            {posts?.length > blogsPerPage && !showMore && buttonLabel && (
              <button
                aria-label="View More Blogs button"
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-blue hover:bg-webriq-darkblue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                onClick={() => {
                  setBlogsToShow(newArray?.length);
                  setShowMore(true);
                }}
              >
                {buttonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
