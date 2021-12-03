import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";

function VariantA({ subtitle, title, posts, buttonLabel }) {
  let blogsPerPage = 6,
    count = 0;
  const [blogsToShow, setBlogsToShow] = React.useState(count + 1); // set number of blogs to show
  const [showMore, setShowMore] = React.useState(false); // show all blogs posts

  // split array into groups of 6 posts
  const splitPosts = (arr, size, numberOfGroups) => {
    const chunks = arr?.reduce(
      (chunks, items, i) =>
        (i % size
          ? chunks[chunks?.length - 1].push(items)
          : chunks.push([items])) && chunks,
      []
    );
    if (chunks?.[chunks?.length]?.length < numberOfGroups) {
      chunks?.[chunks?.length].push(...chunks.pop());
    }
    return chunks;
  };

  const groupedBlogsArray = splitPosts(
    posts,
    blogsPerPage,
    Math.ceil(posts?.length / blogsPerPage)
  );

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            {subtitle && (
              <span className="text-webriq-darkblue font-bold">{subtitle}</span>
            )}
            {title && (
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">
                {title}
              </h1>
            )}
          </div>
          {groupedBlogsArray &&
            groupedBlogsArray
              ?.slice(count, blogsToShow)
              ?.map((posts, index) => (
                <div
                  className="flex flex-wrap justify-center -mx-3"
                  key={index}
                >
                  <div className="flex flex-wrap w-full lg:w-1/2">
                    {posts &&
                      posts?.slice(count, count + 1)?.map((post, key) => (
                        <div className="w-full px-3 mb-5" key={key}>
                          <div className="relative h-64 mx-auto rounded">
                            <div className="relative h-full w-full rounded overflow-hidden">
                              <Image
                                src={urlFor(post?.mainImage)}
                                layout="fill"
                                objectFit="cover"
                                alt={`blog-variantA-image-${key}`}
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                                placeholder="blur"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                            <div className="absolute inset-0 p-6 flex flex-col items-start">
                              {post?.categories && (
                                <div className="flex absolute top-5 left-5">
                                  {post?.categories?.map((category, index) => (
                                    <span
                                      className="py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                      key={index}
                                    >
                                      {category?.title}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {post?.publishedAt && (
                                <span className="mt-auto text-sm text-gray-500">
                                  {format(
                                    new Date(post?.publishedAt),
                                    "dd MMM, yyyy"
                                  )}
                                </span>
                              )}
                              {post?.title && (
                                <Link
                                  href={
                                    `/${post?.slug?.current}` ??
                                    "/page-not-found"
                                  }
                                >
                                  <a
                                    aria-label={`blog post ${key}`}
                                    className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none"
                                  >
                                    {post?.title?.length > 50
                                      ? post?.title.substring(0, 50) + "..."
                                      : post?.title}
                                  </a>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {posts?.slice(count + 1, count + 3)?.map((post, key) => (
                      <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                        <div className="relative mx-auto rounded h-64 md:h-128 lg:h-128 xl:h-128 2xl:h-128">
                          <div className="relative h-full w-full rounded overflow-hidden">
                            <Image
                              src={urlFor(post?.mainImage)}
                              layout="fixed"
                              width="358px"
                              height="256px"
                              objectFit="cover"
                              alt={`blog-variantA-image-${key}`}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                              placeholder="blur"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                          <div className="absolute inset-0 p-6 flex flex-col items-start">
                            {post?.categories && (
                              <div className="flex absolute top-5 left-5">
                                {post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              </div>
                            )}
                            {post?.publishedAt && (
                              <span className="mt-auto text-sm text-gray-500">
                                {format(
                                  new Date(post?.publishedAt),
                                  "dd MMM, yyyy"
                                )}
                              </span>
                            )}
                            {post?.title && (
                              <Link
                                href={
                                  `/${post?.slug?.current}` ?? "/page-not-found"
                                }
                              >
                                <a className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none">
                                  {post?.title?.length > 50
                                    ? post?.title.substring(0, 50) + "..."
                                    : post?.title}
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap w-full lg:w-1/2">
                    {posts?.slice(count + 3, count + 5)?.map((post, key) => (
                      <div className="w-full lg:w-1/2 px-3 mb-5" key={key}>
                        <div className="relative mx-auto rounded h-64 md:h-128 lg:h-128 xl:h-128 2xl:h-128">
                          <div className="relative h-full w-full rounded overflow-hidden">
                            <Image
                              src={urlFor(post?.mainImage)}
                              layout="fixed"
                              width="358px"
                              height="256px"
                              objectFit="cover"
                              alt={`blog-variantA-image-${key}`}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                              placeholder="blur"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                          <div className="absolute inset-0 p-6 flex flex-col items-start">
                            {post?.categories && (
                              <div className="flex absolute top-5 left-5">
                                {post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 text-sm mr-3 bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              </div>
                            )}
                            {post?.publishedAt && (
                              <span className="mt-auto text-sm text-gray-500">
                                {format(
                                  new Date(post?.publishedAt),
                                  "dd MMM, yyyy"
                                )}
                              </span>
                            )}
                            {post?.title && (
                              <Link
                                href={
                                  `/${post?.slug?.current}` ?? "/page-not-found"
                                }
                              >
                                <a className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none">
                                  {post?.title?.length > 50
                                    ? post?.title.substring(0, 50) + "..."
                                    : post?.title}
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {posts?.slice(count + 5, blogsPerPage)?.map((post, key) => (
                      <div className="w-full px-3 mb-5" key={key}>
                        <div className="relative mx-auto rounded h-64">
                          <div className="relative h-full w-full rounded overflow-hidden">
                            <Image
                              src={urlFor(post?.mainImage)}
                              layout="fill"
                              objectFit="cover"
                              alt={`blog-variantA-image-${key}`}
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                              placeholder="blur"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gray-900 opacity-75 rounded" />
                          <div className="absolute inset-0 p-6 flex flex-col items-start">
                            {post?.categories && (
                              <div className="flex absolute top-5 left-5">
                                {post?.categories?.map((category, index) => (
                                  <span
                                    className="mb-auto py-1 px-3 mr-3 text-sm bg-white rounded-full text-webriq-darkblue uppercase font-bold"
                                    key={index}
                                  >
                                    {category?.title}
                                  </span>
                                ))}
                              </div>
                            )}
                            {post?.publishedAt && (
                              <span className="mt-auto text-sm text-gray-500">
                                {format(
                                  new Date(post?.publishedAt),
                                  "dd MMM, yyyy"
                                )}
                              </span>
                            )}
                            {post?.title && (
                              <Link
                                href={
                                  `/${post?.slug?.current}` ?? "/page-not-found"
                                }
                              >
                                <a className="text-xl lg:text-2xl text-white font-bold hover:text-webriq-babyblue transform hover:scale-110 motion-reduce:transform-none">
                                  {post?.title?.length > 50
                                    ? post?.title.substring(0, 50) + "..."
                                    : post?.title}
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    {posts?.length > blogsPerPage && !showMore && buttonLabel && (
                      <button
                        aria-label="View More Blogs button"
                        className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                        onClick={() => {
                          setBlogsToShow(groupedBlogsArray?.length);
                          setShowMore(true);
                        }}
                      >
                        {buttonLabel}
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
